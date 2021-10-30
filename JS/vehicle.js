class Entry{
    constructor(f,l,e1,loc,ex){
        this.f = f;
        this.l = l;
        this.e1 = e1;
        this.loc = loc;
        this.ex = ex;
    }
}
class UI{
    static displayEntries(){
   
        const entries = Store.getEntries();
        entries.forEach((entry) => UI.addEntryToTable(entry));
    }
    static addEntryToTable(entry){
        const tableBody=document.querySelector('#tableBody');
        const row = document.createElement('tr');
        row.innerHTML = `   <td>${entry.f}</td>
                            <td>${entry.l}</td>
                            <td>${entry.e1}</td>
                            <td>${entry.loc}</td>
                            <td>${entry.ex}</td>
                            <td><button class="btn btn-info delete">X</button></td>
                        `;
        tableBody.appendChild(row);
    }
    static clearInput(){
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach((input)=>input.value="");
    }
    static deleteEntry(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className} w-50 mx-auto`;
        div.appendChild(document.createTextNode(message));
        const formContainer = document.querySelector('.form-container');
        const form = document.querySelector('#entryForm');
        formContainer.insertBefore(div,form);
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    static validateInputs(){
        const f = document.querySelector('#oname').value;
        const l = document.querySelector('#vname').value;
        const e1 = document.querySelector('#vnum').value;
        const loc = document.querySelector('#endate').value;
        const ex = document.querySelector('#exdate').value;
        if(f === '' || l === '' || e1 === '' || loc === '' || ex ===''){
            UI.showAlert('All informations must me filled!','danger');
            return false;
        }
        if(ex < loc){
            UI.showAlert('Exit Date cannot be lower than Entry Date','danger');
            return false;
        }
      
        return true;
    }
}

class Store{
    static getEntries(){
        let entries;
        if(localStorage.getItem('entries') === null){
            entries = [];
        }
        else{
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }
    static addEntries(entry){
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
    static removeEntries(e1){
        const entries = Store.getEntries();
        entries.forEach((entry,index) => {
            if(entry.e1 === e1){
                entries.splice(index, 1);
            }
        });
        localStorage.setItem('entries', JSON.stringify(entries));
    }
}

    document.addEventListener('DOMContentLoaded',UI.displayEntries);
    document.querySelector('#entryForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        const f = document.querySelector('#oname').value;
        const l = document.querySelector('#vname').value;
        const e1 = document.querySelector('#vnum').value;
        const loc = document.querySelector('#endate').value;
        const ex = document.querySelector('#exdate').value;
        if(!UI.validateInputs()){
            return;
        }
        
        const entry = new Entry(f, l, e1, loc, ex);
        UI.addEntryToTable(entry);
        Store.addEntries(entry);
        UI.clearInput();
        UI.showAlert('Vehicle successfully added to the parking lot','success');

    });

    document.querySelector('#tableBody').addEventListener('click',(e)=>{
        UI.deleteEntry(e.target);
        var e1 = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        Store.removeEntries(e1);
        UI.showAlert('Vehicle successfully removed from the parking lot list','success');
    })

    document.querySelector('#search').addEventListener('keyup', function searchTable(){
        const searchValue = document.querySelector('#search').value.toUpperCase();
        const tableLine = (document.querySelector('#tableBody')).querySelectorAll('tr');
        for(let i = 0; i < tableLine.length; i++){
            var count = 0;
            const lineValues = tableLine[i].querySelectorAll('td');
            for(let j = 0; j < lineValues.length - 1; j++){
               
                if((lineValues[j].innerHTML.toUpperCase()).startsWith(searchValue)){
                    count++;
                }
            }
            if(count > 0){
               tableLine[i].style.display = '';
            }
            else{
                tableLine[i].style.display = 'none';
            }
        }
    });