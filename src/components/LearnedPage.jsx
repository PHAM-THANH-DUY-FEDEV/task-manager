import React, { useContext, useState } from "react";
import { LearnedContext } from "./contexts/LearnedContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const LearnedPage = () => {
  const { items, addItem, selected, setSelected } = useContext(LearnedContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState("view");
  const [form, setForm] = useState({
    type: "",
    title: "",
    sound: "",
    context: "",
    images: [],
    video: "",
    link: "",
  });
  const handleSubmit = () => {
    if (!form.title) return alert("Vui lòng nhập tên hiệu ứng!");

    addItem({
      ...form,
      id: Date.now(),
    });

    setForm({
      type: "",
      title: "",
      sound: "",
      context: "",
      images: [],
      video: "",
      link: "",
    });
    setMode("view");
  };

  const handleUploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch(`${BASE_URL}/upload-images`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, images: data }));
    } catch (err) {
      alert("Lỗi upload ảnh");
    }
  };

  const handleUploadVideo = async (file) => {
    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await fetch(`${BASE_URL}/upload-video`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, video: data }));
    } catch (err) {
      alert("Lỗi upload video");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#f8f9fa] overflow-hidden font-sans text-slate-900">
      <div className="w-full md:w-80 border-r border-slate-200 bg-white flex flex-col shadow-sm z-10">
        <div className="p-5 border-b border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center text-sm font-bold text-slate-400 hover:text-[#fe8c00] transition-colors"
            >
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">
                ←
              </span>{" "}
              Home
            </button>
            <button
              onClick={() => {
                setSelected(null);
                setMode("add");
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white rounded-full hover:opacity-80 transition-all"
            >
              + Thêm mới
            </button>
          </div>
          <h1 className="text-xl font-black tracking-tight text-slate-800">
            Thư viện của tôi
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {items.map((i) => (
            <div
              key={i.id}
              onClick={() => {
                setSelected(i);
                setMode("view");
              }}
              className={`p-4 rounded-2xl cursor-pointer border transition-all duration-300 ${
                selected?.id === i.id
                  ? "bg-orange-50 border-[#fe8c00] ring-1 ring-[#fe8c00] shadow-lg transform scale-[1.02]"
                  : "bg-white border-gray-200 hover:border-[#ffa32c]"
              }`}
            >
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${selected?.id === i.id ? "text-[#fe8c00]" : "text-slate-400"}`}
              >
                {i.type || "Effect"}
              </span>
              <h3
                className={`font-bold mt-1 ${selected?.id === i.id ? "text-orange-950" : "text-slate-700"}`}
              >
                {i.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f8f9fa] p-5 md:p-10">
        <div className="max-w-4xl mx-auto">
          {mode === "add" && (
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black mb-8 text-slate-800 border-b pb-4">
                Tạo hiệu ứng mới
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Tên hiệu ứng *
                  </label>
                  <input
                    placeholder="Nhập tiêu đề..."
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-[#ffa32c] outline-none transition-all border-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Phân loại
                  </label>
                  <input
                    placeholder="Dạng hiệu ứng..."
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-[#ffa32c] outline-none transition-all border-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Âm thanh
                  </label>
                  <input
                    placeholder="Mô tả tiếng động..."
                    value={form.sound}
                    onChange={(e) =>
                      setForm({ ...form, sound: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-[#ffa32c] outline-none transition-all border-none"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Ngữ cảnh sử dụng
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Dùng trong trường hợp nào?"
                    value={form.context}
                    onChange={(e) =>
                      setForm({ ...form, context: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-[#ffa32c] outline-none transition-all border-none resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Hình ảnh
                  </p>
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl hover:border-[#ffa32c] hover:bg-orange-50 cursor-pointer transition-all">
                    <span className="text-slate-400 text-sm font-bold">
                      Thêm ảnh +
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleUploadImages(Array.from(e.target.files))
                      }
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Video
                  </p>
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl hover:border-[#ffa32c] hover:bg-orange-50 cursor-pointer transition-all">
                    <span className="text-slate-400 text-sm font-bold">
                      Thêm video +
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleUploadVideo(e.target.files[0])}
                    />
                  </label>
                </div>

                {(form.images.length > 0 || form.video) && (
                  <div className="md:col-span-2 flex gap-3 p-4 bg-slate-50 rounded-2xl overflow-x-auto">
                    {form.images.map((img, i) => (
                      <img
                        key={i}
                        src={`${BASE_URL}/imgs/learned/${img}`}
                        className="w-20 h-20 object-cover rounded-xl shadow-sm border border-white"
                        alt=""
                      />
                    ))}
                    {form.video && (
                      <div className="w-20 h-20 bg-slate-900 rounded-xl flex items-center justify-center text-[10px] text-white font-bold">
                        VIDEO
                      </div>
                    )}
                  </div>
                )}

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                    Link tham khảo
                  </label>
                  <input
                    placeholder="https://..."
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-[#ffa32c] outline-none transition-all border-none"
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-4 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white font-black rounded-2xl hover:opacity-90 uppercase tracking-widest text-sm"
                >
                  Lưu vào thư viện
                </button>
                <button
                  onClick={() => setMode("view")}
                  className="px-8 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 transition-all uppercase text-xs tracking-widest"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          {mode === "view" && selected && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden">
                <div className="p-8 md:p-12 bg-gradient-to-br from-white to-slate-50/50 border-b border-slate-50">
                  <span className="px-3 py-1 bg-orange-100 text-[#fe8c00] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4 inline-block">
                    {selected.type || "Effect Design"}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                    {selected.title}
                  </h2>
                </div>

                <div className="p-8 md:p-12 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group">
                      <div className="text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        🔊
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">
                        Âm thanh
                      </p>
                      <p className="text-slate-700 font-bold text-lg">
                        {selected.sound || "N/A"}
                      </p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all group">
                      <div className="text-2xl mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        🌍
                      </div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">
                        Ngữ cảnh
                      </p>
                      <p className="text-slate-700 font-bold text-lg">
                        {selected.context || "N/A"}
                      </p>
                    </div>
                  </div>

                  {selected.images?.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Hình ảnh minh họa
                      </h3>
                      <div className="flex gap-4 flex-wrap">
                        {selected.images.map((img, i) => (
                          <div
                            key={i}
                            className="group relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-inner"
                          >
                            <img
                              src={`${BASE_URL}/imgs/learned/${img}`}
                              className="w-32 h-32 md:w-44 md:h-44 object-cover transform group-hover:scale-110 transition-transform duration-700"
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selected.video && (
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Video Demo
                      </h3>
                      <div className="rounded-[2.5rem] overflow-hidden bg-slate-900 aspect-video shadow-2xl ring-8 ring-slate-50">
                        <video
                          controls
                          className="w-full h-full object-contain"
                        >
                          <source
                            src={`${BASE_URL}/videos/learned/${selected.video}`}
                          />
                        </video>
                      </div>
                    </div>
                  )}

                  {selected.link && (
                    <div className="pt-6">
                      <a
                        href={selected.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between p-6 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white rounded-3xl shadow-xl shadow-orange-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                      >
                        <span className="font-black text-lg uppercase tracking-tight">
                          Khám phá chi tiết
                        </span>
                        <span className="text-2xl transform group-hover:translate-x-2 transition-transform">
                          →
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {mode === "view" && !selected && (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-5xl mb-6 animate-bounce">
                🎯
              </div>
              <h3 className="text-2xl font-black text-slate-300 italic uppercase tracking-tighter">
                Chọn một mục để bắt đầu
              </h3>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ffa32c; }
      `}</style>
    </div>
  );
};

export default LearnedPage;
