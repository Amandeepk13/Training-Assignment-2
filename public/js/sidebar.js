const openSb = document.querySelector('.sort-btn');
const closeSb = document.getElementById('close-sidebar');
const sidebar = document.getElementById('sidebar');
const body = document.body;

const applyBtn = document.getElementById('apply-filters');

const clearBtn = document.getElementById('clear-filters');

openSb.addEventListener('click', () => {
      sidebar.classList.add('active');
      body.classList.add('sidebar-open');
});

closeSb.addEventListener('click', () => {
      sidebar.classList.remove('active');
      body.classList.remove('sidebar-open');
});

applyBtn.addEventListener('click', () => {
     const cBoxes = document.querySelectorAll('.filter-check:checked');
     const cards = document.querySelectorAll('.card');
     const filterChoices = Array.from(cBoxes);

     cards.forEach(card => {
         const cardName = card.querySelector('h4').textContent;

         let match = false;
         for(const filter of filterChoices){
            if(cardName.includes(filter.value)){
                  match=true;
                  break;
            }
         }
         if(match === false){
            card.style.display = "none";
         } else {
            card.style.display = "block";
         }
     });

});

clearBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    document.querySelectorAll('.filter-check').forEach(cbox => {
      cbox.checked = false
  });
  cards.forEach(card => {
      card.style.display = "block";
  });
});

const filterHeader = document.querySelector('.filter-header');
const filterOptions = document.querySelector('.filter-options');
const arr = filterHeader.querySelector('i');

filterHeader.addEventListener('click', () => {

    if(filterOptions.style.display === "none"){
        filterOptions.style.display = "flex";
        arr.className = "fas fa-chevron-down";
    } else {
        filterOptions.style.display = "none";
        arr.className = "fa fa-angle-right";
    }

});


document.addEventListener('DOMContentLoaded', () => {
    const sortOptions = document.querySelectorAll('.sort-options input[type = "radio"]');
    const cardHolder = document.getElementById('card-holder');

    sortOptions.forEach(option => {
        option.addEventListener('change', (e) => {
        if(e.target.value == 'class-name' && e.target.checked){
            sortCards();
        } else if (e.target.checked && e.target.value == 'start-date' || e.target.value == 'end-date'){
            sortCardsByDate(e.target.value);
        }
        });
 
    });
    

    const sortCards = () => {
        const cards = Array.from(cardHolder.getElementsByClassName('card'));

        cards.sort( (a,b) => {
            const nameA = a.querySelector('h4').textContent.toLowerCase();
            const nameB = b.querySelector('h4').textContent.toLowerCase();

            return nameA.localeCompare(nameB);
        });
        cards.forEach(card => {
            cardHolder.appendChild(card);
        });
    }

    const sortCardsByDate = (classDate) => {
        const cards = Array.from(cardHolder.getElementsByClassName('card'));

        cards.sort( (a,b) => {
            let attribute = (classDate === 'start-date') ? 'data-startDate' : 'data-endDate';
            const valA = a.getAttribute(attribute);
            const valB = b.getAttribute(attribute);

            const dateA = new Date(valA);
            const dateB = new Date(valB);

            return dateA - dateB;
        });

         cards.forEach(card => {
            cardHolder.appendChild(card);
        });
    }
});

