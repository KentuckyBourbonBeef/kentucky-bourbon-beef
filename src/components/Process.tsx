const Process = () => {
  return (
    <section className="py-20 bg-bourbon-900 text-white">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Selection</h3>
            <p className="text-bourbon-100">
              Hand-picked premium cuts from the finest Kentucky cattle, chosen for optimal marbling and texture.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Aging</h3>
            <p className="text-bourbon-100">
              Aged in our specialized bourbon-barrel environment for a minimum of 30 days, developing rich flavors.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-bourbon-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Perfection</h3>
            <p className="text-bourbon-100">
              Cut and packaged at peak flavor, delivered fresh to your door in our temperature-controlled packaging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;