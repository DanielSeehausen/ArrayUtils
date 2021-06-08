class ArrayUtils {

  static getMiddleElement(arr) {
    if (arr.length == 0) return null
    return arr[Math.floor(arr.length / 2)]
  }

  static sample(collection) {
    const arr = [ ...collection ]
    return arr[Math.floor(Math.random() * arr.length)]
  }

  static replaceAtIdx(arr, atIdx, newElement) {
    return arr.map((el, idx) => (idx === atIdx ? newElement : el))
  }

  static removeAtIdx(arr, atIdx) {
    return arr.filter((_, idx) => idx !== atIdx)
  }

  static getDifference(arrA, arrB, matcher = (arr, el) => arr.includes(el)) {
    return arrA.filter(arrAElement => !matcher(arrB, arrAElement))
  }

  static sortObjectsByKeyValue(arr, key) {
    const sortedArray = [...arr].sort((a, b) => (a[key] > b[key] ? 1 : -1))
    return sortedArray
  }

  static shuffle(arr) {
    const sorted = [...arr].sort(() => Math.random() - Math.random())
    return sorted
  }

}

module.exports = ArrayUtils
