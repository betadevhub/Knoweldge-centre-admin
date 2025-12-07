import { sortInterpretationTree, textMatchTree } from "./constant";

export const getInterpretation = (sort: string) => {
    const sliced = sort.slice(1);
    const pick = sortInterpretationTree[sliced];
    const found = pick.find(p => p.type === sort);
    const interpretation = `${found?.label} - ${textMatchTree[sliced]}`
    return (interpretation)
}