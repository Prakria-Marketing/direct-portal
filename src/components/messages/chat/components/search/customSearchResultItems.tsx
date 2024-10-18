import CustomSearchResultItem from "./customSearchItem";

export function CustomResultItemsList(props: any) {
    console.log("list>>", props)
    return <div>
        {props.results.map((item: any, index: number) => {
            const isChannel = item.cid
            return <CustomSearchResultItem key={index} item={isChannel ? item.data : item} />
        })}
    </div>
}