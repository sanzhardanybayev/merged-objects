type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never)  extends 
    ((k: infer I) => void) ? I : never


type Merge<A extends any[]> = UnionToIntersection<A[number]>

const isObjectOnly = <T>(obj: T): boolean => typeof obj === 'object' && !Array.isArray(obj)


export const mergeObjects = <T extends { [key: string]: any}, Z extends { [key: string]: any}>(first: T, second: Z): Merge<[T, Z]> => {

    const newObject: any  = {...first}

    if (isObjectOnly(first) && isObjectOnly(second)) {

        Object.keys(second).reduce((acc, current, index) => {
            let childObject = acc[current]

            // This property does exist in the first object
            if (childObject) {
                // If both values are arrays, join them
                if (Array.isArray(acc[current]) && Array.isArray(second[current])) {
                    acc[current] = [...acc[current], ...second[current]]
                } else if (isObjectOnly(acc[current]) && isObjectOnly(second[current])) {
                    // If both values are objects, merge them
                    acc[current] = mergeObjects(childObject, second[current])
                } else {
                    // If second's objects type is not object, rewrite first's objects value
                    acc[current] = second[current]
                }

            } else {
                // This property does not exist in the first object
                acc[current] = second[current]
            }

            return acc
        }, newObject)

    }

    return newObject
}

