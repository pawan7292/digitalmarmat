export default async function StatsComponent() {
  return (
    <div className="flex justify-center gap-20 text-brand-raiden-800">
      <div className="flex flex-col items-center">
        <div className="h1">300+</div>
        <div className="body">Bookings Completed</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h1">4.8+</div>
        <div className="body">Average Rating</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h1">50+</div>
        <div className="body">Verified Experts</div>
      </div>
    </div>
  );
}
