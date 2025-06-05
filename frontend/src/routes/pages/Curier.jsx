import { useState, useEffect, useCallback } from "react";

const AddIcon = () => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'>
		<path d='M12 5v14M5 12h14' />
	</svg>
);

export default function Courier() {
	const [myOrders, setMyOrders] = useState([]);
	const [orders, setOrders] = useState([]);
	const [button, setButton] = useState(1);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdating, setIsUpdating] = useState({});

	const user = JSON.parse(localStorage.getItem("user"));
	const token = localStorage.getItem("token");

	const clearError = useCallback(() => {
		setTimeout(() => setError(""), 3000);
	}, []);

	const loadData = async () => {
		try {
			const response = await fetch(
				"http://192.168.1.89:5000/api/curier-own-orders",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			setMyOrders(data);
		} catch (err) {
			setError("Failed to load orders. Please try again.");
			clearError();
		}
	};

	const loadData1 = async () => {
		try {
			setIsLoading(true);

			const response = await fetch(
				"http://192.168.1.89:5000/api/curier-orders",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(response);
			}

			const data = await response.json();

			setOrders(data);
		} catch (err) {
			setError(err);
			clearError();
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadData();
		loadData1();
	}, []);

	const handleStatusChange = async (orderId, newStatus) => {
		const originalOrder = myOrders.find((order) => order.id === orderId);
		if (!originalOrder) return;

		setIsUpdating((prev) => ({ ...prev, [orderId]: true }));

		try {
			const response = await fetch(
				`http://192.168.1.89:5000/api/curier-orders-stauts`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ status: newStatus, order_id: orderId }),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update order status");
			}

			const updatedOrder = await response.json();

			await loadData();
		} catch (err) {
			setMyOrders((prev) =>
				prev.map((order) => (order.id === orderId ? originalOrder : order))
			);
			setError(`Failed to update order ${orderId}. Please try again.`);
			clearError();
		} finally {
			setIsUpdating((prev) => ({ ...prev, [orderId]: false }));
		}
	};

	const handleAddOrder = async (order) => {
		try {
			const response = await fetch(
				"http://192.168.1.89:5000/api/curier-set-order",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ order_id: order.id }),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to assign order");
			}

			await loadData1();
			await loadData();
		} catch (err) {
			setError(`Failed to take order ${order.id}. Please try again.`);
			clearError();
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "complete":
				return "text-green-600 border-green-400";
			case "pending":
				return "text-yellow-600 border-yellow-400";
			case "created":
				return "text-blue-600 border-blue-400";
			default:
				return "text-gray-700 border-gray-300";
		}
	};

	// Get status text color only
	const getStatusTextColor = (status) => {
		switch (status) {
			case "complete":
				return "text-green-600";
			case "pending":
				return "text-yellow-600";
			case "created":
				return "text-blue-600";
			default:
				return "text-gray-700";
		}
	};

	if (isLoading) {
		return (
			<div className='w-screen h-screen flex items-center justify-center bg-[#f4f4f4]'>
				<div className='text-lg'>Loading orders...</div>
			</div>
		);
	}

	return (
		<div className='w-screen h-screen px-8 py-12 flex flex-col items-center bg-[#f4f4f4] text-[#1a1a1a] font-sans overflow-x-hidden'>
			<div className='w-full flex justify-between items-start mb-10'>
				<h1 className='text-4xl font-semibold'>
					Hello, <span className='font-bold'>{user.name}</span>
				</h1>
				<div className='flex border border-gray-300 rounded-full overflow-hidden'>
					<button
						onClick={() => setButton(1)}
						className={`px-6 py-2 transition-colors ${
							button === 1
								? "bg-black text-white"
								: "bg-white text-black hover:bg-gray-100"
						}`}>
						My Orders ({myOrders.length})
					</button>
					<button
						onClick={() => setButton(2)}
						className={`px-6 py-2 transition-colors ${
							button === 2
								? "bg-black text-white"
								: "bg-white text-black hover:bg-gray-100"
						}`}>
						Available Orders ({orders.length})
					</button>
				</div>
			</div>

			{error && (
				<div className='fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50'>
					{error}
				</div>
			)}

			<div className='w-full max-w-6xl flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 gap-4 overflow-auto'>
				{button === 2 ? (
					// Available Orders Tab
					<>
						<h2 className='text-2xl font-semibold mb-4'>Available Orders</h2>
						<div className='grid grid-cols-6 text-sm font-medium uppercase text-gray-500 border-b pb-2 gap-4'>
							<span>ID</span>
							<span>Distance (km)</span>
							<span>Destination</span>
							<span>Client</span>
							<span>Status</span>
							<span>Actions</span>
						</div>

						{orders.length === 0 ? (
							<div className='text-center py-8 text-gray-500'>
								No available orders at the moment.
							</div>
						) : (
							orders.map((order) => (
								<div
									key={order.id}
									className='grid grid-cols-6 py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition gap-4 items-center'>
									<p className='text-gray-800 font-medium'>#{order.id}</p>
									<p className='text-gray-800'>{order.distance} km</p>
									<p className='text-gray-800 font-medium'>
										{order.destination}
									</p>
									<div className='text-gray-800'>
										<p className='font-medium'>{order.client?.name || "N/A"}</p>
										<p className='text-sm text-gray-500'>
											{order.client?.phone || "-"}
										</p>
									</div>
									<p
										className={`font-medium capitalize ${getStatusTextColor(order.status)}`}>
										{order.status}
									</p>
									<button
										className='cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-100 hover:text-green-600 transition-all'
										aria-label='Take Order'
										onClick={() => handleAddOrder(order)}>
										<AddIcon />
									</button>
								</div>
							))
						)}
					</>
				) : (
					<>
						<h2 className='text-2xl font-semibold mb-4'>My Orders</h2>
						<div className='grid grid-cols-5 text-sm font-medium uppercase text-gray-500 border-b pb-2 gap-4'>
							<span>ID</span>
							<span>Distance (km)</span>
							<span>Destination</span>
							<span>Client</span>
							<span>Status</span>
						</div>

						{myOrders.length === 0 ? (
							<div className='text-center py-8 text-gray-500'>
								You haven't taken any orders yet. Switch to "Available Orders"
								to start!
							</div>
						) : (
							myOrders.map((order) => (
								<div
									key={order.id}
									className='grid grid-cols-5 py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition gap-4 items-center'>
									<p className='text-gray-800 font-medium'>#{order.id}</p>
									<p className='text-gray-800'>{order.distance} km</p>
									<p className='text-gray-800 font-medium'>
										{order.destination}
									</p>
									<div className='text-gray-800'>
										<p className='font-medium'>{order.client?.name || "N/A"}</p>
										<p className='text-sm text-gray-500'>
											{order.client?.phone || "-"}
										</p>
									</div>
									<div className='relative'>
										<select
											value={order.status}
											onChange={(e) =>
												handleStatusChange(order.id, e.target.value)
											}
											disabled={isUpdating[order.id]}
											className={`font-medium rounded px-3 py-2 outline-none border transition-colors ${getStatusColor(order.status)} ${
												isUpdating[order.id]
													? "opacity-50 cursor-not-allowed"
													: "cursor-pointer"
											}`}>
											<option value='created'>Created</option>
											<option value='pending'>In Progress</option>
											<option value='complete'>Completed</option>
										</select>
										{isUpdating[order.id] && (
											<div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
												<div className='w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin'></div>
											</div>
										)}
									</div>
								</div>
							))
						)}
					</>
				)}
			</div>
		</div>
	);
}
