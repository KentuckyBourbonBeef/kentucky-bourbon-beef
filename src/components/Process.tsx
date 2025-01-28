const Process = () => {
  return (
    <section className="py-20 bg-bourbon-900 text-white">
      <div className="container">
        <h2 className="text-4xl font-serif font-bold text-center mb-16">The Art of Bourbon-Aged Beef</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
              <span className="text-3xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Master Selection</h3>
            <p className="text-bourbon-100 leading-relaxed">
              Our master butchers hand-select only the finest Black Angus beef from Kentucky's premium herds. Each cut is chosen for its exceptional marbling, rich color, and perfect texture - the foundation for an extraordinary bourbon-aging journey.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
              <span className="text-3xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Bourbon Barrel Magic</h3>
            <p className="text-bourbon-100 leading-relaxed">
              Each cut enters our specialized aging chamber, where it's surrounded by authentic Kentucky bourbon barrel staves. For 45 days, the meat develops complex flavors from the bourbon-soaked wood, creating notes of vanilla, caramel, and oak that perfectly complement the beef's natural richness.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
              <span className="text-3xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Peak Perfection</h3>
            <p className="text-bourbon-100 leading-relaxed">
              At the precise moment of peak flavor, our artisans hand-cut and package your selection. Each piece is vacuum-sealed to lock in the intoxicating aroma and delivered fresh to your door in our premium temperature-controlled packaging, ready to become the centerpiece of an unforgettable dining experience.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-xl text-bourbon-100 max-w-2xl mx-auto italic">
            "Where Kentucky's finest traditions meet: premium beef aged to perfection in the presence of world-class bourbon barrels. A taste of luxury you won't find anywhere else."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;