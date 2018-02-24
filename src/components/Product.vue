<template>

  <div class="container">
    <div class = "main">
      <div :class = "{center:isActiv,top:notIsActiv}" >
        <h1>Товаров :{{ products.length }}</h1>
        <a 
          class="btn-floating btn-large waves-effect waves-light red" 
          @click = "showModal = true"><i class="material-icons">add</i></a>
      </div>
    
      <transition name="modal">
        <div 
          v-if = "showModal" 
          class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header">
                  <h2>Заполните форму</h2>
                </slot>
              </div>
              <div class="modal-body">
                <slot name="body">
                  <form action="#">
                    <label> <p>Название товара</p>
                      <input 
                        class = "modal-input" 
                        type="text" 
                        v-model="productName" 
                        maxlength="23" 
                        required>
                    </label>

                    <label><p>Производитель</p>
                      <input 
                        class = "modal-input" 
                        type="text" 
                        v-model = "productManufacturer"
                        maxlength="30"
                        required>
                    </label>

                    <label> <p>Гарантия(мес)</p>
                      <input 
                        class = "modal-input" 
                        type="text" 
                        v-model = "productGuarantee" 
                        maxlength="10" 
                        required>
                    </label>
                    <p>Загрузить фото товара</p>
                    <input 
                      class = "modal-input" 
                      type="text" 
                      v-model = "productPhoto" 
                      required>
                    <button 
                      class="modal-default-button" 
                      type="submit" 
                      @click= "add">Ок
                    </button>
                  </form>
                </slot>
              </div>
            
              <div 
                :class="{visibleWarning: emptyField, hiddenWarning: !emptyField}" 
                class = "modal-footer">
                <slot name = "footer">
                  <p >Заполните все поля верно</p>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
 
    
    
      <div class="row">
        <div 
          class = "col s12 m6 l4 xl3" 
          v-for="product in products" 
          :key="product.name">
          <div 
            :title="product.name + '\n' + product.manufacturer" 
            class="card hoverable" >
            <div class="card-image">
              <img 
                class = "img-responsive"
                :src="product.photo">
            </div> 
            <div class="card-content">
              <h3 class="card-title truncate">{{ product.name }}</h3>
              <p 
                class = "card-p" 
                style="font-weight: bold">Производитель:</p>
              <p class = "card-p"> {{ product.manufacturer }}</p>
              <p 
                class = "card-p" 
                style="font-weight: bold">Гарантия:</p>
              <p class = "card-p">{{ product.guarantee }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActiv: true,
      notIsActiv: false,
      emptyField: false,
      productName: "",
      productManufacturer: "",
      productGuarantee: "",
      productPhoto: "",
      image: "",
      showModal: false,
      products: [],
      seen: false
    };
  },
  methods: {
    add() {
      const regexpForProductGuarantee = /[0-9]+/;
      const regexpForImageUrl = /(^http|https):\/\/[a-zA-z0-9]{2,}\.\S+\.(gif|jpg|png)/;
      if (
        this.productName === "" ||
        this.productManufacturer === "" ||
        this.productGuarantee === "" ||
        this.productGuarantee.match(regexpForProductGuarantee) === null ||
        this.productPhoto === "" ||
        this.productPhoto.match(regexpForImageUrl) === null
      ) {
        this.emptyField = true;
      } else {
        this.products.push({
          name: this.productName,
          manufacturer: this.productManufacturer,
          guarantee: this.productGuarantee,
          photo: this.productPhoto
        });
        this.productName = "";
        this.productManufacturer = "";
        this.productGuarantee = "";
        this.productPhoto = "";
        this.showModal = false;
        this.emptyField = false;
      }

      this.notIsActiv = true;
      this.isActiv = false;
    }
  }
};
</script>

<style scoped>
form {
  margin: 50px 0 20px 0;
}

.top {
  margin: 50px auto;
  display: block;
}
.center {
  margin-top: 30%;
}

button {
  width: 200px;
  margin: 0 auto;
  display: block;
}

.card {
  margin: 10px 10px;
  word-wrap: break-word;
}
/*Стили относящиеся к модальному окну*/
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h2 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}

.modal-body p {
  font-size: 15px;
}

input.modal-input {
  font-size: 20px;
}

.visibleWarning {
  visibility: visible;
}
.hiddenWarning {
  visibility: hidden;
}
.modal-footer p {
  color: red;
  margin: 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/*Медиа запросы*/

@media (max-device-width: 500px) {
  .row .col.s12 {
    width: 100%;
    margin-left: auto;
    left: auto;
    right: auto;
  }
}
@media (max-device-width: 500px) {
  .modal-body p {
    font-size: 25px;
  }

  input.modal-input {
    font-size: 30px;
  }
  .card {
    margin: 0 auto;
    width: 600px;
    margin-bottom: 50px;
  }
  .img-responsive {
    height: 650px;
  }
  .card-p {
    font-size: 25px;
  }
}
</style>
