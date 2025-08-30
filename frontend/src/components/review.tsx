import StaticRating from "./staticRating"
import { Card } from "./ui/card"

export default function Review({ name, date, stars, comment }: {
  name: string,
  date: Date,
  stars: number,
  comment: string
}) {
  const actualDate = new Date(date).toString().split(" ");
  return <Card>
    <div className="flex flex-col gap-y-3 rounded-lg p-4">
      <div className="flex gap-x-3 items-center ">
        <div className="h-12 flex justify-center items-center w-12 rounded-full bg-blue-400">
          <div className="flex text-xl flex-col justify-center items-center h-full w-full text-white">
            {name[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className=" flex gap-x-2">
            <div className="font-semibold text-base">{name}</div>
            <div className="flex gap-x-1 items-center">
              <div className="text-orange-500 ">Verified Purchase</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-5"
              >
                <circle cx="12" cy="12" r="9" fill="#f97316" />

                <path
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  d="M9 12.75L11.25 15 15 9.75"
                />
              </svg>
            </div>
          </div>
          <div className="text-slate-500">{actualDate[0] + " " + actualDate[1] + " " + actualDate[2]}</div>
        </div>

      </div>
      <StaticRating stars={stars} />
      <div>{comment}</div>
    </div>
  </Card>
}
