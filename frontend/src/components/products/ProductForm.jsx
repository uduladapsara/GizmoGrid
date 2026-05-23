const ProductForm = ({
	values,
	onChange,
	onSubmit,
	loading,
	onFilesChange,
	onRemoveImage,
	imagePreviews = [],
}) => {
	const handleDrop = (event) => {
		event.preventDefault();
		if (onFilesChange && event.dataTransfer.files?.length) {
			onFilesChange(event.dataTransfer.files);
		}
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	return (
		<form className="grid gap-4" onSubmit={onSubmit}>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-600">Product name</label>
				<input
					className="rounded-xl border border-slate-200 px-4 py-3"
					placeholder="Wireless headset"
					name="name"
					value={values.name}
					onChange={onChange}
				/>
			</div>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-600">Price</label>
				<input
					className="rounded-xl border border-slate-200 px-4 py-3"
					placeholder="$120"
					type="number"
					name="price"
					value={values.price}
					onChange={onChange}
				/>
			</div>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-600">Description</label>
				<textarea
					className="rounded-xl border border-slate-200 px-4 py-3"
					rows="4"
					placeholder="Describe the key features"
					name="description"
					value={values.description}
					onChange={onChange}
				/>
			</div>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-600">Category</label>
				<input
					className="rounded-xl border border-slate-200 px-4 py-3"
					placeholder="Audio"
					name="category"
					value={values.category}
					onChange={onChange}
				/>
			</div>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-600">Stock</label>
				<input
					className="rounded-xl border border-slate-200 px-4 py-3"
					placeholder="10"
					type="number"
					name="stock"
					value={values.stock}
					onChange={onChange}
				/>
			</div>
			<div className="grid gap-2">
				<label className="text-sm font-medium text-slate-600">
					Product images
				</label>
				<div
					className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500"
					onDrop={handleDrop}
					onDragOver={handleDragOver}
				>
					<input
						id="product-images"
						type="file"
						accept="image/*"
						multiple
						onChange={(event) =>
							onFilesChange?.(event.target.files)
						}
						className="hidden"
					/>
					<label
						htmlFor="product-images"
						className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm"
					>
						Click to upload or drop images
					</label>
					<span className="text-xs text-slate-400">
						Up to 5 images, JPG/PNG/WebP
					</span>
				</div>
				{imagePreviews.length ? (
					<div className="grid grid-cols-3 gap-3 md:grid-cols-5">
						{imagePreviews.map((preview, index) => (
							<div
								key={`${preview.url}-${index}`}
								className="group relative overflow-hidden rounded-xl border border-slate-200"
							>
								<img
									src={preview.url}
									alt={preview.name}
									className="h-20 w-full object-cover"
								/>
								{onRemoveImage ? (
									<button
										type="button"
										onClick={() => onRemoveImage(index)}
										className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-700 shadow-sm"
									>
										Remove
									</button>
								) : null}
							</div>
						))}
					</div>
				) : null}
			</div>
			<button
				type="submit"
				disabled={loading}
				className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
			>
				{loading ? "Saving..." : "Save product"}
			</button>
		</form>
	);
};

export default ProductForm;
