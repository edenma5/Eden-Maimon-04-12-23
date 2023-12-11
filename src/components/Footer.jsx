export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="flex justify-center mt-auto">
        <p className="mt-auto text-sm">
          Copyright© {currentYear} Weather App By Eden Maimon
        </p>
      </div>
    </>
  );
}
