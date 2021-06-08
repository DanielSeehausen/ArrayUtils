const ArrayUtils = require('../index')

describe('ArrayUtils', () => {

  const getOneToTen = () => ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const getOneToNine = () => ([1, 2, 3, 4, 5, 6, 7, 8, 9])

  describe('getMiddleElement', () => {
    it('returns null when there are no elements', () => {
      expect(
        ArrayUtils.getMiddleElement([])
      ).toBeNull()
    })

    it('returns the middle element when there are an odd amount of elements', () => {
      expect(
        ArrayUtils.getMiddleElement(getOneToNine())
      ).toBe(5)
    })

    it('returns the second of the two middle elements when there are an even amount of elements', () => {
      expect(
        ArrayUtils.getMiddleElement(getOneToTen())
      ).toBe(6)
    })
  })

  describe('sample', () => {
    it('returns a random element from the array', () => {
      const samples = Array(20).fill().map(() => (
        ArrayUtils.sample(getOneToTen())
      ))

      const uniques = [...new Set(samples)]
      expect(uniques.length).toBeGreaterThan(1)
    })

    describe('when the array is empty', () => {
      it('returns undefined', () => {
        const result = ArrayUtils.sample([])
        expect(result).toBe(undefined)
      })
    })
  })

  describe('replaceAtIdx', () => {
    it('returns a new array with the value replaced at index',() => {
      const arr = [1, 2, 3, 4]
      const newArr = ArrayUtils.replaceAtIdx(arr, 1, 9)

      expect(newArr).toEqual([1, 9, 3, 4])
      expect(arr).toEqual([1, 2, 3, 4])
    })


    it('should not mutate the original Array', () => {
      const originalArray = [1, 2, 3, 4]

      const originalArrayCopy = [...originalArray]
      const newArr = ArrayUtils.replaceAtIdx(originalArray, 1)

      expect(originalArrayCopy).toStrictEqual(originalArray)
      expect(newArr).not.toBe(originalArray)
    })
  })

  describe('removeAtIdx', () => {
    it('removes the element at index', () => {
      const arr = [1, 2, 3, 4]
      expect(ArrayUtils.removeAtIdx(arr, 1)).toEqual([1, 3, 4])
    })

    it('should not mutate the original Array', () => {
      const originalArray = [1, 2, 3, 4]

      const originalArrayCopy = [...originalArray]
      const newArr = ArrayUtils.removeAtIdx(originalArray, 1)

      expect(originalArrayCopy).toStrictEqual(originalArray)
      expect(newArr).not.toBe(originalArray)
    })

    describe('when the index is out of bounds', () => {
      it('returns the array', () => {
        const arr = [1, 2, 3, 4]
        expect(ArrayUtils.removeAtIdx(arr, -1)).toEqual([1, 2, 3, 4])

        const otherArr = [1, 2, 3, 4]
        expect(ArrayUtils.removeAtIdx(otherArr, 5)).toEqual([1, 2, 3, 4])
      })
    })
  })

  describe('getDifference', () => {
    describe('without a matcher provided', () => {
      it('returns an array which contains all elements in arrA that are not in arrB', () => {
        const arrB = [1, 2, 3, 4, 5]
        const difference = ['a', 'b', null, 6, 7]
        const arrA = [ ...arrB, ...difference ]

        const result = ArrayUtils.getDifference(arrA, arrB)

        expect(result).toStrictEqual(difference)
      })
    })

    describe('with a matcher provided', () => {
      it('returns an array which contains all obj elements in arrB that are not in arrA according to the provided matcher callback', () => {
        const arrB = [ { id: 3 }, { id: 4 }, { id: 5 } ]
        const difference = [ { id: 2 }, {id: 9 }]
        const arrA = [ ...arrB, ...difference ]
        const matcher = (arr, el) => arr.some(({ id }) => id === el.id)

        const result = ArrayUtils.getDifference(arrA, arrB)

        expect(result).toStrictEqual(difference)
      })
    })
  })

  describe('sortObjectsByKeyValue', () => {
    it('should return all original elements', () => {
      const arrOfObjects = [{ key1: 'b', key2: 4 }, { key1: 'c', key2: 1 }, { key1: 'f', key2: 5 }, { key1: 'a', key2: 2 }, { key1: 'd', key2: 6 }, { key1: 'e', key2: 3 }]

      const sortedArray = ArrayUtils.sortObjectsByKeyValue(arrOfObjects, 'key1')

      expect(sortedArray).toHaveLength(arrOfObjects.length)
      arrOfObjects.forEach(element => {
        sortedArray.splice(sortedArray.indexOf(element))
      })
      expect(sortedArray).toHaveLength(0)
    })

    it('should sort by the given key value', () => {
      const arrOfObjects = [{ key1: 'b', key2: 4 }, { key1: 'c', key2: 1 }, { key1: 'f', key2: 5 }, { key1: 'a', key2: 2 }, { key1: 'd', key2: 6 }, { key1: 'e', key2: 3 }]

      const sortedLetterArray = ArrayUtils.sortObjectsByKeyValue(arrOfObjects, 'key1')

      expect(sortedLetterArray).toHaveLength(arrOfObjects.length)
      expect(sortedLetterArray[0].key1).toBe('a')
      expect(sortedLetterArray[1].key1).toBe('b')
      expect(sortedLetterArray[2].key1).toBe('c')

      const sortedNumbesArray = ArrayUtils.sortObjectsByKeyValue(arrOfObjects, 'key2')

      expect(sortedNumbesArray).toHaveLength(arrOfObjects.length)
      expect(sortedNumbesArray[0].key2).toBe(1)
      expect(sortedNumbesArray[1].key2).toBe(2)
      expect(sortedNumbesArray[2].key2).toBe(3)
    })

    it('should not mutate the original Array', () => {
      const originalArray = [{ key1: 'b', key2: 4 }, { key1: 'c', key2: 1 }, { key1: 'f', key2: 5 }, { key1: 'a', key2: 2 }, { key1: 'd', key2: 6 }, { key1: 'e', key2: 3 }]

      const originalArrayCopy = [...originalArray]
      const sortedArray = ArrayUtils.sortObjectsByKeyValue(originalArray, 'key1')

      expect(originalArrayCopy).toStrictEqual(originalArray)
      expect(sortedArray).not.toBe(originalArray)
    })
  })

  describe('shuffle', () => {
    const originalArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    it('should return the original elements', () => {
      const shuffledArray = ArrayUtils.shuffle(originalArr)

      expect(shuffledArray.sort()).toStrictEqual(originalArr.sort())
    })

    it('should shuffle the array', () => {
      const shuffledArray = ArrayUtils.shuffle(originalArr)

      expect(shuffledArray).not.toStrictEqual(originalArr)
    })

    it('should not mutate the original Array', () => {
      const originalArray = [1, 2, 3]
      const originalArrayCopy = [...originalArray]

      const shuffledArray = ArrayUtils.shuffle(originalArray)

      expect(originalArrayCopy).toStrictEqual(originalArray)
      expect(shuffledArray).not.toBe(originalArray)
    })
  })
})
