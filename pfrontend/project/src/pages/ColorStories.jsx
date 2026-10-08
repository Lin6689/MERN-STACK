import { Link } from "react-router-dom";

const colors = [
  {
    name: "Crimson Red",
    filterName: "shoes",
    meaning: "Passion & Energy",
    description:
      "Red is the color of intensity and confidence. Wearing red awakens your inner fire and draws attention naturally. Perfect when you want to feel powerful and alive.",
    image: "https://cahoot.in/cdn/shop/files/CSMSSRT8365_1_b49130df-b35c-489a-b20d-12a08c4cfa2b.jpg?v=1736776187&width=800",
    bg: "bg-white",
    hoverBg: "hover:bg-red-300",
  },
  {
    name: "Ocean Blue",
    filterName: "blue",
    meaning: "Calm & Trust",
    description:
      "Blue brings peace to the mind and soul. It creates a sense of reliability and quiet strength. Ideal for days when you want to feel centered and composed.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGd31YaR9VtVXc9Umhupqf1MGQqVC4gZPxaonvriJUg&s=10",
    bg: "bg-white",
    hoverBg: "hover:bg-blue-100",
  },
  {
    name: "Emerald Green",
    filterName: "green",
    meaning: "Growth & Harmony",
    description:
      "Green connects you to nature and balance. It softens the spirit and brings a refreshing sense of renewal. Wear it when you seek harmony and calm energy.",
    image: "https://images.unsplash.com/photo-1771919331453-9a52362d8909?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JlZW4lMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    bg: "bg-zinc",
    hoverBg: "hover:bg-emerald-100",
  },
  {
    name: "Soft Ivory",
    filterName: "stone",
    meaning: "Purity & Simplicity",
    description:
      "Ivory speaks of quiet elegance and clarity. It reflects simplicity and grace. A timeless choice when you want to feel light, clean, and refined.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSywt2V7YYwWvUwUNFKRsb7fjus4bH1I92Sjs9qgfR5lw&s=10",
    bg: "bg-stone-50",
    hoverBg: "hover:bg-yellow-300",
  },
  {
    name: "Midnight Black",
    filterName: "black",
    meaning: "Power & Mystery",
    description:
      "Black is the ultimate expression of sophistication. It holds mystery and strength. Wear black when you want to feel protected, elegant, and in control.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=900&fit=crop",
    bg: "bg-white",
    hoverBg: "hover:bg-neutral-200",
  },
  {
    name: "Blush Pink",
    meaning: "pink",
    description:
      "Pink carries gentle warmth and tenderness. It softens your presence and opens the heart. Perfect for moments when you want to feel delicate and loved.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpFDgvYOag_btHWc1ZQOpIOrqgZjczWVXjnLr8wnOMOstSzeigkEA3YQJy&s=10",
    bg: "bg-white",
    hoverBg: "hover:bg-rose-300",
  },
  {
    name: "Golden Amber",
    filterName: "golden",
    meaning: "Warmth & Optimism",
    description:
      "Amber radiates joy and golden energy. It lifts the mood and brings a sunny confidence. Wear it when you want to feel bright and optimistic.",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200&h=900&fit=crop",
    bg: "bg-white",
    hoverBg: "hover:bg-amber-300",
  },
  {
    name: "Lavender Mist",
    filterName: "purple",
    meaning: "Creativity & Calm",
    description:
      "Lavender inspires imagination while keeping a dreamy calm. It balances creativity with peace. Ideal when you want to feel inspired yet soft.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&h=900&fit=crop",
    bg: "bg-white",
    hoverBg: "hover:bg-purple-300",
  },
];

export default function ColorStories() {
  return (
    <div className="bg-zinc-200 min-h-screen">
      {/* ========== TOP INTRO SECTION ========== */}
      <section 
  className="w-full h-full mb-2"
  style={{
    background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 20%, #ffeaa7 40%, #a8edea 60%, #fed6e3 80%, #d4fc79 100%)"
  }}
>
  <div className="flex flex-col lg:flex-row items-stretch min-h-[90vh]">
    {/* Left Image */}
    <div className="w-full lg:w-1/2 h-[55vh] lg:h-auto">
      <img
        src="https://t4.ftcdn.net/jpg/02/19/09/09/360_F_219090913_JWWPoAsQEEX5g883iqRyW4MQI7EG3W9D.jpg"
        alt="Color meaning"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right Text */}
    <div className="w-full lg:w-1/2 flex items-center px-8 sm:px-12 lg:px-16 py-14 lg:py-0">
      <div className="max-w-lg">
        <span className="text-sm font-medium tracking-[0.2em] text-neutral-600 uppercase mb-6 block">
          The Language of Color
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.15] mb-8">
          Do you know that every color has its own meaning?
        </h1>
        <p className="text-lg text-neutral-700 leading-relaxed mb-6">
          Colors are not just visual — they carry emotion, energy, and personality.
          Choosing the right color according to your nature can change how you feel
          and how the world sees you.
        </p>
        <p className="text-lg text-neutral-700 leading-relaxed">
          Scroll down and discover which colors truly match your inner self.
        </p>
      </div>
    </div>
  </div>
</section>

    {colors.map((color, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={color.name}
            className={`w-full max-w-6xl mx-auto  rounded-2xl overflow-hidden border border-neutral-200 shadow-sm ${color.bg} ${color.hoverBg} transition-colors duration-300 group`}
          >
            {/* lg:flex-row-reverse alternates the image and text position per row */}
            <div className={`flex flex-col lg:flex-row items-stretch h-[60vh] ${isEven ? '' : 'lg:flex-row-reverse'}`}>
              
              {/* Text Column */}
              <div className="w-full lg:w-1/2 flex items-center px-8 sm:px-10 lg:px-14 py-6">
                <div className="max-w-md">
                  <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase mb-2 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight mb-2">
                    {color.name}
                  </h2>
                  <p className="text-base text-neutral-700 font-medium mb-3">
                    {color.meaning}
                  </p>
                  <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
                    {color.description}
                  </p>
                  <Link
  to={`/shop?color=${encodeURIComponent(color.filterName)}`}
  className="inline-block mt-6 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition"
>
  {color.name}
</Link>
                </div>
              </div>

              {/* Image Column with Zoom Effect */}
              <div className="w-full lg:w-1/2 h-full overflow-hidden">
                <img
                  src={color.image}
                  alt={color.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

            </div>
          </section>
        );
      })}
      {/* Bottom CTA */}
      <section className="py-20 bg-white mt-2">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-5">
            Find the color that matches your nature
          </h3>
          <p className="text-neutral-500 text-lg mb-10">
            Explore pieces that speak the language of your favorite shades.
          </p>
          <Link
            to="/shop"
            className="inline-block px-10 py-4 rounded-full bg-neutral-900 text-white font-medium tracking-tight hover:bg-neutral-800 transition"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
}