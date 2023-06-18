import React from 'react'

const Faqs = () => {
  return (
    <section id="faqs" className="bg-beigeLight p-10">
      <h2 className="text-3xl md:text-4xl leading-7 text-greenDark uppercase font-sans font-extrabold">
        FAQS
      </h2>
      <div className="flex items-center justify-center">
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8 space-y-2">
          <p className="text-base md:text-lg font-semibold text-center mb-8 text-greenDark font-sans ">
            Frequently Asked Questions
          </p>

          <div className="space-y-4 flex flex-col items-center">
            <details className="w-full md:w-1/2 rounded-lg ring-1 ring-greenDark bg-white font-sans">
              <summary className="px-4 py-6 text-greenDark font-semibold text-sm md:text-base">
                How does the garbage collection app work?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-greenMoss text-sm md:text-base font-medium">
                Our app simplifies garbage collection by providing a
                user-friendly platform for scheduling pickups, tracking
                collection progress, and receiving notifications. Users can
                easily request waste collection at their preferred time and
                location, making the process hassle-free.
              </p>
            </details>
            <details className="w-full md:w-1/2 rounded-lg ring-1 ring-greenDark bg-white font-sans">
              <summary className="px-4 py-6 text-greenDark font-semibold text-sm md:text-base">
                Do you work on public holidays?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-greenMoss text-sm md:text-base font-medium">
                No, we respect public holidays as we also give our stuff a
                chance to rest.
              </p>
            </details>
            <details className="w-full md:w-1/2 rounded-lg ring-1 ring-greenDark bg-white font-sans">
              <summary className="px-4 py-6 text-greenDark font-semibold text-sm md:text-base">
                How can I pay for the service requsted?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-greenMoss text-sm md:text-base font-medium">
                You can pay when the truck driver comes to perform the service.
                Alternatively you can send money via mobile money indicating the
                service you are paying for.
              </p>
            </details>
            <details className="w-full md:w-1/2 rounded-lg ring-1 ring-greenDark bg-white font-sans">
              <summary className="px-4 py-6 text-greenDark font-semibold text-sm md:text-base">
                Do you have any subscription packages?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-greenMoss text-sm md:text-base font-medium">
                Yes, we offer subscription packages which lasts for six months
                with a discount.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faqs