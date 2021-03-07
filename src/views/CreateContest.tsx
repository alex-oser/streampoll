export const CreateContest = (props: any) => {
    const { setSection } = props
    return (
        <p onClick={() => setSection("home") }>GO BACK</p>
    )
}