// util function to sort array of objects based on attribute value
export function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    let result = 0;
    if (a[property] < b[property]) {
      result = -1;
    } else if (a[property] > b[property]) {
      result = 1;
    }
    return result * sortOrder;
  };
}
