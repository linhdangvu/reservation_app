// filter client duplicate
const filterCategory: any = (data: any) => {
    const arrayCategory: string[] = []
    for (const i of data) {
        if (!arrayCategory.includes(i.fields.Category.stringValue)) {
            arrayCategory.push(i.fields.Category.stringValue)
        }
    }
    return arrayCategory
}