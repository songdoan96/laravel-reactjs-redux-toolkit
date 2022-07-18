function Loading({ title = "Đang tải..." }) {
  return (
    <div className="flex align-bottom gap-4 ">
      <h1 className="text-xl">{title}</h1>
      <div className="spinner"></div>
    </div>
  );
}

export default Loading;
