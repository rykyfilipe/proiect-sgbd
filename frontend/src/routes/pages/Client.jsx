import { useState, useEffect, useCallback, useMemo } from "react";

const DeleteIcon = () => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'>
		<path d='M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6' />
	</svg>
);

const CloseIcon = () => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'>
		<path d='M18 6L6 18M6 6l12 12' />
	</svg>
);

const locations = [
	{ id: 1, name: "Bucuresti" },
	{ id: 2, name: "Cluj-Napoca" },
	{ id: 3, name: "Timisoara" },
	{ id: 4, name: "Iasi" },
	{ id: 5, name: "Brasov" },
	{ id: 6, name: "Constanta" },
	{ id: 7, name: "Sibiu" },
	{ id: 8, name: "Oradea" },
	{ id: 9, name: "Craiova" },
	{ id: 10, name: "Galati" },
	{ id: 11, name: "Baia Mare" },
	{ id: 12, name: "Bacau" },
	{ id: 13, name: "Arad" },
	{ id: 14, name: "Ploiesti" },
	{ id: 15, name: "Targu Mures" },
	{ id: 16, name: "Suceava" },
	{ id: 17, name: "Buzau" },
	{ id: 18, name: "Pitesti" },
	{ id: 19, name: "Alba Iulia" },
	{ id: 20, name: "Resita" },
	{ id: 999, name: "LocA" },
	{ id: 1000, name: "LocB" },
];

export default function Client() {
	const [orders, setOrders] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [from, setFrom] = useState(locations[0].name);
	const [to, setTo] = useState(locations[1].name);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const user = JSON.parse(localStorage.getItem("user"));
	const token = localStorage.getItem("token");

	const locationMap = useMemo(() => {
		return locations.reduce((acc, loc) => {
			acc[loc.name] = loc.id;
			return acc;
		}, {});
	}, []);

	const clearError = useCallback(() => {
		setTimeout(() => setError(""), 3000);
	}, []);
	const loadData = async () => {
		try {
			setIsLoading(true);

			const response = await fetch("http://192.168.1.89:5000/api/orders", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log(data);
			setOrders(data);
		} catch (err) {
			setError("Failed to load orders. Please try again.");
			clearError();
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		loadData();
	}, [clearError, token]);

	const handleCreate = async () => {
		if (to === from) {
			setError("Origin and destination cannot be the same!");
			clearError();
			return;
		}

		setIsSubmitting(true);
		setError("");

		const id_from = locationMap[from];
		const id_to = locationMap[to];

		if (!id_from || !id_to) {
			setError("Invalid location selected!");
			clearError();
			setIsSubmitting(false);
			return;
		}

		const newOrder = {
			user_id: user.id,
			id_to,
			id_from,
		};

		try {
			console.log(newOrder);
			const response = await fetch("http://192.168.1.89:5000/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newOrder),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to create order");
			}
			await loadData();
			setShowForm(false);
		} catch (err) {
			setError(err.message || "Failed to create order. Please try again.");
			clearError();
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSelectFrom = useCallback(
		(value) => {
			if (value !== to) {
				setFrom(value);
			}
		},
		[to]
	);

	const handleSelectTo = useCallback(
		(value) => {
			if (value !== from) {
				setTo(value);
			}
		},
		[from]
	);

	const handleCloseForm = useCallback(() => {
		setShowForm(false);
		setError("");
	}, []);

	const getStatusColor = (status) => {
		switch (status) {
			case "complete":
				return "text-green-600";
			case "pending":
				return "text-yellow-600";
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
			<h1 className='text-4xl font-semibold w-full text-left mb-16'>
				Hello, <span className='font-bold'>{user.name}</span>
			</h1>

			<button
				className='absolute top-[55px] right-[50px] bg-black text-white px-7 py-2 rounded-3xl hover:bg-white hover:text-black hover:border border-transparent hover:border-black cursor-pointer transition-all'
				onClick={() => setShowForm(true)}
				disabled={showForm}>
				Create new order
			</button>

			{error && (
				<div className='fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50'>
					{error}
				</div>
			)}

			<div className='w-full max-w-4xl flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 gap-4 overflow-auto'>
				<div className='grid grid-cols-4 text-sm font-medium uppercase text-gray-500 border-b pb-2 gap-4'>
					<span>ID</span>
					<span>Distance (km)</span>
					<span>Courier</span>
					<span>Status</span>
				</div>

				{orders.length === 0 ? (
					<div className='text-center py-8 text-gray-500'>
						No orders found. Create your first order!
					</div>
				) : (
					orders.map((order) => (
						<div
							key={order.id}
							className='grid grid-cols-4 py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition gap-4 items-center'>
							<p className='text-gray-800 font-medium'>#{order.id}</p>
							<p className='text-gray-800'>{order.distance} km</p>
							<div className='text-gray-800'>
								<p className='font-medium'>{order.courier?.name || "N/A"}</p>
								<p className='text-sm text-gray-500'>
									{order.courier?.phone || "-"}
								</p>
							</div>
							<p
								className={`font-medium capitalize ${getStatusColor(order.status)}`}>
								{order.status}
							</p>
						</div>
					))
				)}
			</div>

			{showForm && (
				<>
					<div
						className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'
						onClick={handleCloseForm}
					/>

					<div className='fixed top-1/2 left-1/2 w-[400px] bg-white shadow-2xl rounded-3xl transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col p-8'>
						<button
							type='button'
							className='absolute top-4 right-4 hover:bg-gray-100 rounded-full cursor-pointer p-2 transition-colors'
							onClick={handleCloseForm}>
							<CloseIcon />
						</button>

						<h2 className='text-2xl font-semibold mb-6 text-gray-800'>
							Create New Order
						</h2>

						<div className='flex flex-col gap-6 flex-grow'>
							<div>
								<label
									className='block text-lg font-semibold text-gray-800 mb-2'
									htmlFor='start-location'>
									From:
								</label>
								<select
									onChange={(e) => handleSelectFrom(e.target.value)}
									id='start-location'
									value={from}
									className='w-full bg-transparent border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition'
									disabled={isSubmitting}>
									{locations.map((loc) => (
										<option
											key={loc.id}
											value={loc.name}
											disabled={loc.name === to}>
											{loc.name}
										</option>
									))}
								</select>
							</div>

							<div>
								<label
									className='block text-lg font-semibold text-gray-800 mb-2'
									htmlFor='end-location'>
									To:
								</label>
								<select
									onChange={(e) => handleSelectTo(e.target.value)}
									id='end-location'
									value={to}
									className='w-full bg-transparent border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition'
									disabled={isSubmitting}>
									{locations.map((loc) => (
										<option
											key={loc.id}
											value={loc.name}
											disabled={loc.name === from}>
											{loc.name}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className='flex gap-3 mt-8'>
							<button
								type='button'
								onClick={handleCloseForm}
								className='flex-1 bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors'
								disabled={isSubmitting}>
								Cancel
							</button>
							<button
								onClick={handleCreate}
								className='flex-1 bg-black text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={isSubmitting || from === to}>
								{isSubmitting ? "Creating..." : "Create Order"}
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
