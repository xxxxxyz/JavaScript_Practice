/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */

// 封装渲染函数

const creator = "老张";

function renderBooksList() {
  // 获取数据
  axios({
    url: "http://hmajax.itheima.net/api/books",
    params: {
      creator,
    },
  }).then((result) => {
    const bookList = result.data.data;
    // console.log(result);
    const bookListStr = bookList
      .map((item, index) => {
        const { bookname, author, publisher, id } = item;
        return `
        <tr>
          <th style="width: 150px;">${index + 1}</th>
          <th>${bookname}</th>
          <th>${author}</th>
          <th>${publisher}</th>
          <td data-id=${id}>
           <span class="del">删除</span>
           <span class="edit">编辑</span>
          </td>
        </tr>
      `;
      })
      .join("");

    document.querySelector(".list").innerHTML = bookListStr;
  });
}

// 网页加载，获取并渲染一次
renderBooksList();

// /**
//  * 目标2：新增图书
//  *  2.1 新增弹框->显示和隐藏
//  *  2.2 收集表单数据，并提交到服务器保存
//  *  2.3 刷新图书列表
//  */

const modal = new bootstrap.Modal(document.querySelector(".add-modal"));

document.querySelector(".add-btn").addEventListener("click", () => {
  const addForm = document.querySelector(".add-form");
  const bookObj = serialize(addForm, { hash: true, empty: true });

  axios({
    url: "http://hmajax.itheima.net/api/books",
    method: "post",
    data: {
      ...bookObj,
      creator,
    },
  }).then((result) => {
    renderBooksList();
    addForm.reset();
  });
  modal.hide();
});

/**
 * 目标3：删除图书
 *  3.1 删除元素绑定点击事件->获取图书id
 *  3.2 调用删除接口
 *  3.3 刷新图书列表
 */
// 事件委托
document.querySelector(".list").addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    const theBookId = e.target.parentNode.dataset.id;

    // console.log(theBookId);
    // 调用删除接口
    axios({
      url: `http://hmajax.itheima.net/api/books/${theBookId}`,
      method: "delete",
    }).then(() => {
      renderBooksList();
    });
  }
});

/**
 * 目标4：编辑图书
 *  4.1 编辑弹框->显示和隐藏
 *  4.2 获取当前编辑图书数据->回显到编辑表单中
 *  4.3 提交保存修改，并刷新列表
 */
// 4.1 编辑弹框->显示和隐藏
const modalDom = document.querySelector(".edit-modal");
const editModal = new bootstrap.Modal(modalDom);

document.querySelector(".list").addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const theBookId = e.target.parentNode.dataset.id;

    axios({
      url: `http://hmajax.itheima.net/api/books/${theBookId}`,
    }).then((result) => {
      const bookObj = result.data.data;
      // document.querySelector(".edit-form .bookname").value = bookname;
      // document.querySelector(".edit-form .author").value = author;
      // document.querySelector(".edit-form .publisher").value = publisher;
      // 数据对象的属性和类名一致
      const keys = Object.keys(bookObj);
      keys.forEach((key) => {
        document.querySelector(`.edit-form .${key}`).value = bookObj[key];
      });
    });
    editModal.show();
  }
});

// 点击修改按钮 -> 点击 -> 隐藏
document.querySelector(".edit-btn").addEventListener("click", (e) => {
  const editForm = document.querySelector(".edit-form");
  const { id, bookname, author, publisher } = serialize(editForm, {
    hash: true,
    empty: true,
  });

  axios({
    url: `http://hmajax.itheima.net/api/books/${id}`,
    method: "put",
    data: {
      id,
      bookname,
      author,
      publisher,
    },
  }).then(() => {
    renderBooksList();
  });

  editModal.hide();
});

