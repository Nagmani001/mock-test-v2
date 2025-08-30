export default function Describe({ heading, subHeading }: {
  heading: string,
  subHeading: string
}) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="font-semibold text-xl sm:text-2xl text-gray-900 mb-4 leading-tight">
        {heading}
      </h2>
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
        {subHeading}
      </p>
    </div>
  );
}
