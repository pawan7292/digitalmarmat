export default async function YourNeedsComponent() {
  return (
    <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20">
      <div className="h4 text-brand-raiden-500 text-center">
        Your needs Our Concern
      </div>
      <div className="flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-14 lg:gap-20 justify-center flex-wrap">
        <div className="h3 px-8 text-brand-ruby-500 py-4 text-center rounded-2xl border-2 border-brand-raiden-500">
          Trouble<br></br>Finding<br></br>Technicians
        </div>
        <div className="h3 px-8 text-brand-ruby-500 py-4 text-center rounded-2xl border-2 border-brand-raiden-500">
          Purchase<br></br>And<br></br>Installation
        </div>
      </div>
    </div>
  );
}
