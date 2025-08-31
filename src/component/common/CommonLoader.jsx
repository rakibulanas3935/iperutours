import { Loader } from "lucide-react";
import React from "react";

const CommonLoader = () => {
	return (
		<div className="min-h-screen flex justify-center items-center bg-neutral-background">
			<div className="flex items-center gap-3 text-slate-300">
				<Loader className="w-6 h-6 animate-spin text-brand-primary" />
				<span className="text-lg font-medium text-brand-secondary">Loading ...</span>
			</div>
		</div>
	);
};

export default CommonLoader;
