let reservedCheck=false;
const reserBtn=document.querySelector('.reservation');
const reserP=document.querySelector('.resPage');
const con=document.querySelector('.confirmed');
const resultDiv=document.getElementById('result');
const cancel=document.querySelector('.cancel');

document.addEventListener('DOMContentLoaded',()=>{
    const checkInput=document.getElementById('check-in');
    const checkOutInput=document.getElementById('check-out');
    let checkInPicker, checkOutPicker;

    const formatDate=(date)=>{
        console.log(date);
        const year=date.getFullYear();
        const month=String(date.getMonth()+1).padStart(2,'0');
        const day=String(date.getDate()).padStart(2,'0');
        return `${year}-${month}-${day}`;
    }
    const setInitialDates=()=>{
        const today=new Date();
        const tomorrow=new Date(today);
        tomorrow.setDate(tomorrow.getDate()+1);
    }
    setInitialDates(); // 초기날짜 설정 실행

    checkInPicker=new Pikaday({
        field:checkInput,
        format:'YYYY-MM-DD',
        minDate:new Date(),
        onSelect:function(date){
            checkOutPicker.setMinDate(date);
            if(checkOutPicker.getDate()<=date){ // 퇴실이 입실보다 이전인 경우
                let newCheckOut=new Date(date);
                newCheckOut.setDate(newCheckOut.getDate()+1); // 퇴실 날짜 하루 뒤로 설정
                checkOutPicker.setDate(newCheckOut); // 퇴실 날짜 선택기 업데이트
            }
        }
    });
    checkOutPicker=new Pikaday({
        field:checkOutInput,
        format:'YYYY-MM-DD',
        minDate:new Date(checkInput.value),
        onSelect:function(date){
            if(date<=checkInPicker.getDate()){ // 퇴실이 입실보다 이전인 경우
                alert('퇴실날짜는 입실 날짜 이후여야 합니다');
                checkOutPicker.setDate(new Date(checkInput.value)+1);
                return;
            }
        }
    });
    const BookingForm=document.getElementById('bookingForm');
    BookingForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const checkIn=checkInput.value;
        const checkOut=checkOutInput.value;
        const adults=document.getElementById('adults').value;
        const children=document.getElementById('children').value;
        if(!checkIn || !checkOut || !adults){
            alert('모든 필드를 빠짐없이 입력해주세요');
        }else{
            const checkInDate=new Date(checkIn);
        const checkOutDate=new Date(checkOut);
        const nights=Math.round((checkOutDate - checkInDate) / (1000*60*60*24));
        console.log(checkInDate,checkOutDate);
        const result=`
            <h2>예약 현황</h2>
            <p>입실 날짜 : ${formatDate(checkInDate)}</p>
            <p>퇴실 날짜 : ${formatDate(checkOutDate)}</p>
            <p>숙박 기간 : ${nights}박</p>
            <p>성인 수 : ${adults}</p>
            <p>미성년자 수 : ${children}</p>
            <button>닫기</button>
        `;
        resultDiv.innerHTML=result;
        resultDiv.scrollIntoView({behavior:'smooth'});
        alert('예약이 완료되었습니다');
        reserP.style.display="none";
        reservedCheck=true;
        reserBtn.innerHTML="예약확인";
        }
    });
});


reserBtn.addEventListener('click',()=>{
    if(!reservedCheck){
        reserP.style.display="flex";
    }else{
        con.style.display='flex';
        resultDiv.style.display="block";
        
        const close=document.querySelector('.confirmed>#result>button');
        close.addEventListener('click',()=>{
            con.style.display="none";
            resultDiv.style.display="none";
        });
    }
});

cancel.addEventListener('click',()=>{
    alert('예약을 취소했습니다.');
    reserP.style.display="none";
});