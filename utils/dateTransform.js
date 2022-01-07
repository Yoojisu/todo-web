class DateUtil{
 static dayTransform(date) {
  let day = "";
  switch(date){
    case 0 :
      day = "일요일"
      break;
    case 1 :
      day = "월요일"
      break;
    case 2 :
      day = "화요일"
      break;
    case 3 :
      day = "수요일"
      break;
    case 4 :
      day = "목요일"
      break;
    case 5 :
      day = "금요일"
      break;
    default:
      day =  "토요일"
    }
    return day;
}
}

export default DateUtil;