
// 获取users的数量
fetch('https://jsonplaceholder.typicode.com/users')
.then(function(response){
    return response.json();
})
.then(function(users){
    console.log(users.length);
});
