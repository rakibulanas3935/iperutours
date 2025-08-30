import { Loader } from "lucide-react";
import React from "react";

const CommonLoader = () => {
	return (
		<div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
			<div className="flex items-center gap-3 text-slate-300">
				<Loader className="w-6 h-6 animate-spin text-blue-400" />
				<span className="text-lg font-medium">Loading ...</span>
			</div>
		</div>
	);
};

export default CommonLoader;
