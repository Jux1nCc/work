/*window.onload = ()=>{
    let numbers = document.querySelectorAll(".math_phone a")
    let btn = document.querySelector('.number_okey')
    let sec_nums = document.querySelectorAll(".selected_number a")
    let reset = document.querySelector(".reset")
    let num_box = [] //已选组合
    console.log(num_box)

    //生成的组合假数据
    for (let index = 0; index < 10; index++) {
        num_box.push(Math.floor(Math.random()*10)+Math.floor(Math.random()*100))  // 先计算好在push  ，边push 边计算 不卡死也得累死
    }
    ////

    //循环绑定事件换事件委托 ssh
    sec_nums.forEach(el=>{
        el.addEventListener("click",()=>{
            el.innerHTML = ""
        })
    })
    reset.addEventListener("click",()=>{
        sec_nums[0].innerHTML = sec_nums[1].innerHTML = ""
        layer.closeAll();
    })
    btn.addEventListener("click",()=>{
        let commit_num = sec_nums[0].innerHTML + "" + sec_nums[1].innerHTML
        let repeatnum = 0
        num_box.map(el=>{
            if (el==commit_num) {
                //  该组合您已选过了
                layer.open({
                    type: 1,
                    shadeClose: false,
                    title: false,
                    closeBtn: 0,
                    skin: 'yourclass',
                    area: ['6.8rem', ''],
                    content: $('#zuheYixuan'),
                    success: function () {
                        $("body").addClass('dontmove')
                    },
                    end: function () {
                        $("body").removeClass("dontmove")
                    }
                });
                repeatnum++
            }
        })
        //  组合选择成功
        repeatnum==0?layer.open({
            type: 1,
            shadeClose: false,
            title: false,
            closeBtn: 0,
            skin: 'yourclass',
            area: ['6.8rem', ''],
            content: $('#zuHecg'),
            success: function () {
                $("body").addClass('dontmove')
            },
            end: function () {
                $("body").removeClass("dontmove")
            }
        }):""
    })

    numbers.forEach(el=>{
        el.addEventListener("touchstart",()=>{
            let num1 = sec_nums[0]
            let num2 = sec_nums[1]
            el.classList.add("active")
            if (num1.innerHTML==num2.innerHTML&&num1.innerHTML=="") {
                num1.innerHTML = el.innerHTML
            }else if(num2.innerHTML==""){
                num2.innerHTML = el.innerHTML
            }else if(num1.innerHTML==""){
                num1.innerHTML = el.innerHTML
            }
        })
    })
    document.documentElement.addEventListener("touchend",()=>{
        setTimeout(()=>{
            numbers.forEach(el=>{
                el.classList.remove("active")
            })
        },200)
        
    })
}*/