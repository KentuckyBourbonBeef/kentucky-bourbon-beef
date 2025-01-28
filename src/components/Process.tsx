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
              Following Kentucky's rich traditions of craftsmanship, our master butchers hand-select only the finest Black Angus beef. Each cut is chosen for its exceptional marbling and texture - the foundation for our unique Bourbon Grains finishing process.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
              <span className="text-3xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Bourbon-Finishing Excellence</h3>
            <p className="text-bourbon-100 leading-relaxed">
              Using Bourbon Grains from Kentucky's finest distilleries, we finish our cattle through our time-honored process that infuses each cut with subtle bourbon-inspired flavors. This traditional approach creates an exceptional flavor profile that celebrates Kentucky's heritage.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
              <span className="text-3xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Peak Perfection</h3>
            <p className="text-bourbon-100 leading-relaxed">
              At the precise moment of peak flavor development, our artisans hand-cut and package your selection, ensuring each piece captures the essence of Kentucky's finest traditions - from world-class distilleries to premium beef craftsmanship.
            </p>
          </div>
        </div>
        <div className="mt-16 text-center">
          <p className="text-xl text-bourbon-100 max-w-2xl mx-auto italic">
            "Where Kentucky's finest traditions meet: premium beef finished with Bourbon Grains from world-class distilleries, creating a one-of-a-kind culinary experience."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;