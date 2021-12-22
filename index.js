/**
2021-11-27 李
ライブライフをつかえず、ページングを作成した

2021-11-29 李
初期化処理を共通化にする
*/

window.onload = () => {

    const pageSize = 5;
    const visiblePageSize = 5;
    const targe = document.getElementById('paging');
    const len = document.querySelectorAll("li").length;
    const pageCount = Math.ceil(len / pageSize);
    let currentIndex = 2;
  
    //共通aタグの作成
    const createTag = () => {
      let a = document.createElement('a');
      a.href = 'javascript:void(0)';
      return a
    }
  
    for (let i = -1; i <= pageCount + 2; i++) {
      if (pageCount >= 1 && visiblePageSize >= 1) {
        let obj = createTag();
        if (i == -1) {
          obj.style.cssText = 'font-weight:700;';
          obj.innerText = "<";
        } else if (i == 0) {
          obj.setAttribute('id', 'pre_point');
          obj.className = 'hidden';
          obj.innerText = '...';
        } else if (i == pageCount + 1) {
          obj.setAttribute('id', 'next_point');
          obj.innerText = '...';
          if (pageCount <= visiblePageSize) {
            obj.className = "hidden";
          }
        } else if (i == pageCount + 2) {
          obj.style.cssText = 'font-weight:700;';
          obj.innerText = ">";
        } else {
          obj.innerText = i;
          if (i > visiblePageSize) {
            obj.className = 'hidden';
          }
        }
        targe.appendChild(obj);
      }
  
    }
  
  
  
    const preBtn = document.getElementById('pre_point');
    const nextBtn = document.getElementById('next_point');
  
    if (pageCount > visiblePageSize) {
      preBtn.addEventListener('click', (e) => {
        let nextSibling = e.currentTarget.nextElementSibling;
        let prevIndex = 0;
        while (nextSibling) {
          if (nextSibling.classList.contains('hidden')) {
            nextSibling = nextSibling.nextElementSibling;
          } else {
            prevIndex = Array.from(nextSibling.parentElement.children).indexOf(nextSibling);
            break;
          }
        }
        currentIndex = prevIndex - 1;
  
        if (document.querySelectorAll('#paging a.hidden').length >= 1 && currentIndex - 1 <= pageCount - visiblePageSize) {
          const temp = Array.from(e.target.parentElement.children).find((e, i) => {
            return i == currentIndex + visiblePageSize
          })
  
          if (typeof temp != 'undefined') {
            temp.classList.add('hidden');
            nextBtn.classList.remove('hidden');
          }
        }
        if (currentIndex == 2) {
          preBtn.classList.add('hidden');
        }
  
        showCurrent();
        setCurrent();
        showList();
  
      })
  
      nextBtn.addEventListener('click', e => {
        let prevSibling = e.currentTarget.previousElementSibling;
        let nextIndex = 0
        while (prevSibling) {
          if (prevSibling.classList.contains('hidden')) {
            prevSibling = prevSibling.previousElementSibling;
          } else {
            nextIndex = Array.from(prevSibling.parentElement.children).indexOf(prevSibling);
            break;
          }
        }
        currentIndex = nextIndex + 1;
  
        if (currentIndex - 1 > visiblePageSize && document.querySelectorAll('#paging a.hidden').length >= 1) {
          const temp = Array.from(e.target.parentElement.children).find((e, i) => {
            return i == currentIndex - visiblePageSize
          })
  
          if (typeof temp != 'undefined') {
            temp.classList.add('hidden');
            preBtn.classList.remove('hidden');
          }
        }
        if (currentIndex == pageCount + 1) {
          nextBtn.classList.add('hidden');
        }
  
        showCurrent();
        setCurrent();
        showList();
  
      })
  
    }
  
    //現在のページのスタイル
    const setCurrent = () => {
      document.querySelectorAll('a').forEach((e, i) => {
        if (currentIndex == i) {
          e.classList.add("aktif");
        } else {
          e.classList.remove("aktif");
        }
      })
    }
    setCurrent();
  
    //内容を表示・非表示
    const showList = () => {
      document.querySelectorAll('#listPage li').forEach((e, i) => {
        //分かりやすくするため、１から数える
        i++;
        if ((currentIndex - 1) * pageSize >= i && i > (currentIndex - 2) * pageSize) {
          e.classList.remove("hidden");
        } else {
          e.classList.add("hidden");
        }
      })
    }
    showList();
  
    const showCurrent = () => {
      document.querySelectorAll('a').forEach((e, i) => {
        if (currentIndex == i) {
          e.classList.remove("hidden");
        }
      })
    }
  
    const alist = document.querySelectorAll('a:not([id="pre_point"],[id="next_point"])');
  
    alist.forEach(a => {
      a.addEventListener('click', (e) => {
        let index = 0;
        index = Array.from(e.target.parentElement.children).indexOf(e.currentTarget);
  
        //<をクリックした場合
        if (index == 0) {
          if (currentIndex == 2) return false
  
          if (currentIndex - 2 == pageCount && visiblePageSize < pageCount) {
            nextBtn.classList.add('hidden');
          } else if (currentIndex - 2 <= pageCount - visiblePageSize && visiblePageSize < pageCount) {
            nextBtn.classList.remove('hidden');
          }
  
          if (currentIndex - 1 > 2 && visiblePageSize < pageCount) {
            preBtn.classList.remove('hidden');
          } else if (currentIndex - 1 == 2 && visiblePageSize < pageCount) {
            preBtn.classList.add('hidden')
          }
  
          currentIndex--;
  
          if (document.querySelectorAll('#paging a.hidden').length >= 1 && currentIndex - 1 <= pageCount - visiblePageSize) {
            const temp = Array.from(e.target.parentElement.children).find((e, i) => {
              return i == currentIndex + visiblePageSize
            })
  
            if (typeof temp != 'undefined') {
              temp.classList.add('hidden');
            }
  
          }
  
          showCurrent();
          setCurrent();
          showList();
  
          //>をクリックした場合
        } else if (index == (pageCount + 3)) {
          if (currentIndex - 1 == pageCount) return false
  
          if (currentIndex == pageCount && visiblePageSize < pageCount) {
            nextBtn.classList.add('hidden');
          } else if (currentIndex < pageCount && visiblePageSize < pageCount) {
            nextBtn.classList.remove('hidden');
          }
  
          if (currentIndex > visiblePageSize && visiblePageSize < pageCount) {
            preBtn.classList.remove('hidden');
          } else if (currentIndex < visiblePageSize && visiblePageSize < pageCount) {
            preBtn.classList.add('hidden');
          }
          currentIndex++;
  
          if (currentIndex - 1 > visiblePageSize && document.querySelectorAll('#paging a.hidden').length >= 1) {
            const temp = Array.from(e.target.parentElement.children).find((e, i) => {
              return i == currentIndex - visiblePageSize
            })
  
            if (typeof temp != 'undefined') {
              temp.classList.add('hidden');
            }
          }
  
          showCurrent();
          setCurrent();
          showList();
        } else {
          currentIndex = index;
          setCurrent();
          showList()
        }
      })
    })
  
  
  }
  