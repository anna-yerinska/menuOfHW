'use strict';

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var btnGetName = document.querySelector('.btn-getName'),
        studentList = [],
        studentListNew = [],
        studentListCompare = [],
        xhr; 

    btnGetName.addEventListener('click', getName);

    function getName() {
        var xhr = new XMLHttpRequest();

        xhr.open('get', '/get-names', true);
        xhr.send();
        xhr.addEventListener('readystatechange', function() {

            if(xhr.readyState === 4 && xhr.status === 200) {

                if (studentList.length >= 2) {
                    var namesNew = xhr.responseText,
                        show = document.querySelector('.show');

                    namesNew = namesNew.slice(9, -2);
                    studentListNew = namesNew.split(',');
                    studentListNew.forEach(function(nameNew){
                        if (studentListNew[0] === studentListNew[1] || studentListNew[0] === studentListNew[2]) {
                        studentListNew.splice(0,1);
                        }
                        if (studentListNew[0] === studentListNew[1] || studentListNew[1] === studentListNew[2]) {
                        studentListNew.splice(2,1);
                        }
                    });
                    studentList.forEach(function(name) {
                        studentListNew.forEach(function(nameNew) {
                            if (name === nameNew) {
                                let i = studentListNew.indexOf(nameNew);
                                studentListNew.splice(i, 1);
                            } 
                            if (studentListNew.length === 0) {
                                var info = document.querySelector('.info'),
                                    li  = document.createElement('li');

                                info.appendChild(li);
                                li.innerHTML = 'Уникальные имена не найдены';
                            } 
                        })
                    });                                     
                    for (let i = 0; i < studentListNew.length; i++) {
                        var li = document.createElement('li');
                                                                
                        show.appendChild(li);
                        li.innerHTML = studentListNew[i]; 
                    };
                studentList = studentList.concat(studentListNew); 
                } else {
                    var names = xhr.responseText,
                        show = document.querySelector('.show');

                    names = names.slice(9, -2);
                    studentList = names.split(',');
                    studentList.forEach(function(name){
                        if (studentList[0] === studentList[1] || studentList[0] === studentList[2]) {
                        studentList.splice(0,1);
                        }
                        if (studentList[0] === studentList[1] || studentList[1] === studentList[2]) {
                        studentList.splice(2,1);
                        }
                    });
                    for (let i = 0; i < studentList.length; i++) {
                        var li = document.createElement('li');
                        show.appendChild(li);
                        li.innerHTML = studentList[i];
                    };
                }
            }
        });
    }
}


