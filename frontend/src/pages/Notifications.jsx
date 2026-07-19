import Navbar from "../components/Navbar";

function Notifications() {

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="p-10 pt-2">

                <div className="mb-8">

                    <h1 className="text-4xl font-bold">

                        Notifications

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Notifications will arrive soon.

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Notifications;