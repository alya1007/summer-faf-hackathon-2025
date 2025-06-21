const FiltersSection = () => {
	return (
		<div className="flex flex-col gap-4 bg-card p-8 rounded-lg shadow-md min-w-80">
			<h2 className="text-lg font-semibold">Filters</h2>
			<div className="flex flex-col gap-2">
				<label className="flex items-center">
					<input type="checkbox" className="mr-2" />
					Filter by language
				</label>
				<label className="flex items-center">
					<input type="checkbox" className="mr-2" />
					Filter by stars
				</label>
			</div>
		</div>
	);
};

export default FiltersSection;
