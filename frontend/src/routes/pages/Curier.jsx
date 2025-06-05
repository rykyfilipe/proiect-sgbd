import { useState } from "react";
import Logo from "../../assets/delete.svg";
import Close from "../../assets/close.svg";

const mock_orders = [
	{
		id: 1,
		destination: "destination",
		status: "created",
		distance: 120,
		courier: { name: "Andrei Pop", phone: "0740 123 456" },
	},
	{
		id: 2,
		destination: "destination",
		status: "pending",
		distance: 80,
		courier: { name: "Maria Ionescu", phone: "0752 654 321" },
	},
	{
		id: 3,
		destination: "destination",
		status: "complete",
		distance: 200,
		courier: { name: "George Marin", phone: "0730 111 222" },
	},
	{
		id: 4,
		destination: "destination",
		status: "pending",
		distance: 50,
		courier: { name: "Ioana Radu", phone: "0765 333 444" },
	},
	{
		id: 5,
		destination: "destination",
		status: "created",
		distance: 150,
		courier: { name: "Alex Popescu", phone: "0722 555 666" },
	},
	{
		id: 6,
		destination: "destination",
		status: "complete",
		distance: 300,
		courier: { name: "Cristina Dumitru", phone: "0744 777 888" },
	},
	{
		id: 7,
		destination: "destination",
		status: "pending",
		distance: 70,
		courier: { name: "Paul Georgescu", phone: "0733 999 000" },
	},
	{
		id: 8,
		destination: "destination",
		status: "created",
		distance: 95,
		courier: { name: "Raluca Ene", phone: "0760 888 777" },
	},
	{
		id: 9,
		destination: "destination",
		status: "complete",
		distance: 180,
		courier: { name: "Dorin Mihai", phone: "0720 333 111" },
	},
	{
		id: 10,
		destination: "destination",
		status: "pending",
		distance: 40,
		courier: { name: "Adela Stoica", phone: "0750 444 222" },
	},
];

const distances = {
	"Alba Iulia-Suceava": 200,
	"Suceava-Bucuresti": 350,
	"Bucuresti-Pitesti": 120,
	"Alba Iulia-Pitesti": 150,
};
const locations = ["Alba Iulia", "Suceava", "Bucuresti", "Pitesti"];

const user = {
	name: "Ricardo",
	id: 1,
};

export default function Client() {
	const [myOrders, setMyOrders] = useState(mock_orders.slice(3, 4));
	const [orders, setOrders] = useState(mock_orders);
	const [showForm, setShowForm] = useState(false);
	const [button, setButton] = useState(1);

	return (
		<div className='w-screen h-screen px-8 py-12 flex flex-col items-center bg-[#f4f4f4] text-[#1a1a1a] font-sans overflow-x-hidden'>
			<div className='w-full flex justify-between'>
				<h1 className='text-4xl font-semibold w-full text-left mb-16'>
					Hello, <span className='font-bold'>{user.name}</span>
				</h1>
				<div className='flex'>
					<button
						className={`${button === 1 ? "bg-black text-white" : "border"} py-2 px-2  w-max`}>
						MyOrders
					</button>
					<button
						className={`${button === 2 ? "bg-black text-white" : "border"} py-2 px-2  w-max`}>
						Take new order
					</button>
				</div>
			</div>

			<div className='w-full max-w-4xl flex flex-col bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 gap-4'>
				<div className='grid grid-cols-6 text-sm font-medium uppercase text-gray-500 border-b pb-2'>
					<span>ID</span>
					<span>Distance (km)</span>
					<span>Destination</span>
					<span>Curier</span>
					<span>Status</span>
				</div>

				{orders.map((order) => (
					<div
						key={order.id}
						className='grid grid-cols-6 py-3 px-4destination : "destination", rounded-xl border border-gray-200 hover:bg-gray-50 transition'>
						<p className='text-gray-800'>{order.id}</p>
						<p className='text-gray-800'>{order.distance}</p>
						<p className='text-gray-800'>{order.destination}</p>
						<p className='text-gray-800'>
							{order.courier.name}
							<br />
							{order.courier.phone}
						</p>

						<p
							className={`font-medium ${
								order.status === "complete"
									? "text-green-600"
									: order.status === "pending"
										? "text-yellow-600"
										: "text-gray-700"
							}`}>
							{order.status}
						</p>
						<button
							className='cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-400 transition'
							aria-label='Logo Button'
							onClick={() => handleDelete(order)}>
							<img
								src={Logo}
								alt='Logo'
								className='w-5 h-5'
							/>
						</button>
					</div>
				))}
			</div>
			{showForm && (
				<>
					<div className='fixed inset-0 bg-[#eaeaea]/30 backdrop-blur-md z-40'></div>

					<form
						onSubmit={handleCreate}
						className='fixed top-1/2 left-1/2 w-[400px] h-[520px] bg-[#eaeaea] costum-shadow rounded-3xl 
                                transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col p-8'>
						<button
							className='absolute top-[15px] right-[15px] hover:bg-stone-300 rounded-full cursor-pointer p-2'
							onClick={() => setShowForm(false)}>
							<img src={Close} />
						</button>
						<div className='flex flex-col gap-6 flex-grow'>
							<label
								className='text-lg font-semibold text-gray-800'
								htmlFor='start-location'>
								Select start location:
							</label>
							<select
								onChange={(e) => setFrom(e.target.value)}
								id='start-location'
								className='bg-transparent border border-gray-400 rounded-lg px-4 py-2 text-black
                                    focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                                    transition'>
								{locations.map((loc) => (
									<option
										key={loc}
										value={loc}>
										{loc}
									</option>
								))}
							</select>

							<label
								className='text-lg font-semibold text-gray-800'
								htmlFor='end-location'>
								Select end location:
							</label>
							<select
								onChange={(e) => setTo(e.target.value)}
								id='end-location'
								className='bg-transparent border border-gray-400 rounded-lg px-4 py-2 text-black
                                    focus:outline-none focus:ring-2 focus:ring-black focus:border-black
                                    transition'>
								{locations.map((loc) => (
									<option
										key={loc}
										value={loc}>
										{loc}
									</option>
								))}
							</select>
						</div>

						<button
							onClick={handleCreate}
							type='submit'
							className='mt-8 bg-black text-white font-semibold px-8 py-3 rounded-3xl
                                    hover:bg-white hover:text-black hover:border hover:border-black
                                    transition-colors duration-300 ease-in-out cursor-pointer'>
							Submit
						</button>
					</form>
				</>
			)}
		</div>
	);
}
