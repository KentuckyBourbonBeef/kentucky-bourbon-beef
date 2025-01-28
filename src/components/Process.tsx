const Process = () => {
  return (
    <section className="py-20 bg-bourbon-900 text-white">
      <div className="container">
        <h2 className="text-4xl font-serif font-bold text-center mb-16">The Art of Bourbon-Finished Beef</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
              <span className="text-3xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Master Selection</h3>
            <p className="text-bourbon-100 leading-relaxed">
              Our master butchers hand-select only the finest Black Angus beef from Kentucky's premium herds. Each cut is chosen for its exceptional marbling, rich color, and perfect texture - the foundation for our unique Bourbon Grains finishing process.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
              <span className="text-3xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Bourbon-Finishing Excellence</h3>
            <p className="text-bourbon-100 leading-relaxed">
              Using nutrient-rich Bourbon Grains from Kentucky's finest distilleries, we finish our cattle through a time-tested process that enhances tenderness and creates an exceptional flavor profile. This sustainable practice supports local farmers while reducing industry waste.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
              <span className="text-3xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Peak Perfection</h3>
            <p className="text-bourbon-100 leading-relaxed">
              At the precise moment of peak flavor development, our artisans hand-cut and package your selection. Each piece is vacuum-sealed to preserve its exceptional taste and delivered fresh to your door in our premium temperature-controlled packaging.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-xl text-bourbon-100 max-w-2xl mx-auto italic">
            "Where Kentucky's finest traditions meet: premium beef finished with nutrient-rich Bourbon Grains from world-class distilleries. A taste of luxury you won't find anywhere else."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;