function generateNickname(){
    const firstName = document.getElementById('firstName').value.trim();
    if (!firstName){
        alert('Please enter your name!');
        return;
    }
    const surnames = ["Geller", "Tribbiani", "Buffay", "Green", "Bing", "Wheeler", "Hannigan"];
    const namePrefix = firstName.length < 4 ? firstName : firstName.slice(0, 4);
    const capitalizedPrefix = namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1).toLowerCase();
    const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    document.getElementById('result').textContent = capitalizedPrefix + " " + randomSurname;
}
document.getElementById('firstName').addEventListener('keypress', function(e){
if(e.key === 'Enter'){
    generateNickname();
}});