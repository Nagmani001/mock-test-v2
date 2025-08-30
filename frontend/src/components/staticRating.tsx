export default function StaticRating({ stars }: {
  stars: number
}) {
  switch (stars) {
    case 1:
      return <div className="rating">
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="1 star" defaultChecked />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
      </div>

    case 2:
      return <div className="rating">
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="2 star" defaultChecked />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
      </div>

    case 3:
      return <div className="rating">
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="3 star" defaultChecked />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
      </div>

    case 4:
      return <div className="rating">
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="4 star" defaultChecked />
        <input disabled type="radio" className="mask mask-star-2 bg-orange-400" aria-label="5 star" />
      </div>

    case 5:
      return <div className="rating">
        <input disabled type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="1 star" />
        <input disabled type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="2 star" />
        <input disabled type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="3 star" />
        <input disabled type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="4 star" />
        <input disabled type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" aria-label="5 star" defaultChecked />
      </div>
  }
}
