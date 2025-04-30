export const exampleFn = () => {
    
}

export const classnames = (classes:any) => {
    let result = '';
  
    for (let key in classes) {
      if (classes[key]) {
        result += key + ' ';
      }
    }
  
    return result.trim(); 
  }