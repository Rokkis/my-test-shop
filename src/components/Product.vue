<template>

<div class="container">
  <div class = "main">
    <a class="btn-floating btn-large waves-effect waves-light red" @click = "showModal = true"><i class="material-icons">add</i></a>
      
    
    <transition name="modal">
        <div v-if = "showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h2>Заполните форму</h2>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
               <form action="">
          <label> <p>Название товара</p>
              <input type="text" v-model="productName">
              </label>

               <label><p>Производитель</p>
              <input type="text" v-model = "productManufacturer">
              </label>

               <label> <p>Гарантия(мес)</p>
              <input type="text" v-model = "productGuarantee">
              </label>

             <p>Загрузить фото товара</p>
              <input type="text" v-model = "productPhoto">
              

               </form>
            </slot>
          </div>


         
              
              <button class="modal-default-button" @click= "add">
                OK
              </button>
            
          
        </div>
      </div>
    </div>
    </transition>

    
    
     <div class="row" v-for = "product in products">
    <div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img class = "img" :src="product.photo">
          
        
        </div> 
        <div class="card-content">
          <span class="card-title">{{product.name}}</span>
          
        
          <p>Производитель:{{product.manufacturer}}</p>
          <p>Гарантия:{{product.guarantee}}</p>
        </div>
      </div>
    </div>
  </div>
  
  </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
           
            productName:"",
            productManufacturer:"",
            productGuarantee:"",
            productPhoto:'',
            image: '',
            showModal: false,
            products:[],
            seen:false,
        }
    },
    methods:{
     add(){
      this.showModal = false;
      
      this.products.push({name:this.productName,manufacturer:this.productManufacturer,guarantee:this.productGuarantee,photo:this.productPhoto,seen:false});
      
     
     },
     
    }
}
</script>

<style scoped>
    .container{
      width:1000px;
      margin:0 auto;
    }
    form{
        margin:50px 0;
    }
    input{
        margin-bottom: 10px;
    }
    .btn-floating{
      
      margin: 50px auto;
      display: block;
    }
    button{
      width: 200px;
      margin: 0 auto;
      display: block;
    }
    .row{
      display: inline-block;
    }
    .card{
      width:200px;
     
    }
   .img{
     height:300px;
   }
   .row{
     
     
     
     word-wrap:break-word;
   }
    .product-item{
      
      display: inline-block;
      width:200px;
      height:200px;
      border: 2px solid black;
    }
    img{
      width: 100px;
      height:100px;
    }
    /*Стили относящиеся к всплываемому окну*/
    .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h2 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
 
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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

</style>
