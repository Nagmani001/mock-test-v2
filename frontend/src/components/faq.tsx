export default function Faq({ heading, subHeading }: {
  heading: string,
  subHeading: string
}) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-b-0">
      <h3 className="font-semibold text-lg text-gray-900 mb-2 leading-tight">
        {heading}
      </h3>
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
        {subHeading}
      </p>
    </div>
  );
}
