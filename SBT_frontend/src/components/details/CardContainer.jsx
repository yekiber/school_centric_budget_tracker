export default function CardContainer({ children }) {
    return (
      <div className={`pt-6 px-6 m-auto lg:w-[80%]`}>
        <main className={`border rounded-md bg-white text-darkGray p-12`}>
          {children}
        </main>
      </div>
    )
  }