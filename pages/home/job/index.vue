<template>
  <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
		<div class="box shadow-sm rounded bg-white mb-3 overflow-hidden">
			<ul class="nav border-bottom osahan-line-tab" id="myTab" role="tablist">
				<li class="nav-item">
					<nuxt-link :to="'/home'" class="nav-link" role="tab">About</nuxt-link>
				</li>
				<li class="nav-item">
					<nuxt-link :to="'/home/job'" class="nav-link active" role="tab">Jobs</nuxt-link>
				</li>
			</ul>
		</div>

    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab">
  	    <div class="box shadow-sm border rounded bg-white p-3">
  		    <div class="row">
  			    <div v-for="(item, index) in data" :key="index" class="col-12">
  				    <div>
  					    <div class="border job-item mb-3">
                  <div class="d-flex align-items-center justify-content-between px-3 pt-2">
                    <a-button shape="round" type="danger" size="small" class="font--13">
                      {{ item.type }}
                    </a-button>
                    <a-dropdown>
                      <a-icon :style="{ fontSize: '18px', fontWeight: 'bold' }" type="more" />
                      <a-menu slot="overlay">
                        <a-menu-item key="0">
                          <nuxt-link :to="`/home/job/${ item.id }`" class="d-flex align-items-center"><a-icon class="mr-2" type="eye" />View</nuxt-link>
                        </a-menu-item>

                        <a-menu-item key="1">
                          <nuxt-link :to="`/home/job/edit/${ item.id }`" class="d-flex align-items-center"><a-icon class="mr-2" type="edit" />Update</nuxt-link>
                        </a-menu-item>

                        <a-menu-item key="2">
                          <a @click="showDeleteConfirm(item.id)" class="d-flex align-items-center"><a-icon class="mr-2" type="delete" />Delete</a>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </div>
                  
  						    <div class="d-flex align-items-center justify-content-between p-3 job-item-header">
  							    <div class="overflow-hidden mr-2">
  							  	  <nuxt-link :to="`/home/job/${item.id}`"><h6 class="font-weight-bold text-dark mb-0 text-truncate">{{ item.name }}</h6></nuxt-link>
  							  	  <div class="small text-gray-500">
  							  		  <i class="feather-map-pin"></i> {{ item.address.description }}
  							  	  </div>
  							    </div>
  					  	  </div>

                  <div class="w-100 px-3 pb-2 ml-1 row">
                    <button v-for="(e, index) in item.categories" :key="index" type="button" class="mr-2 mb-2 btn btn-light d-flex align-items-center">
                      {{ e.name }}
                    </button>
                  </div>

  							  <div class="d-flex align-items-center p-3 border-top border-bottom job-item-body">
  								  <img width="100%" height="100%" :src="item.introImg" alt="" data-original-title="Sophia Lee">
  							  </div>

  								<div class="p-3 job-item-footer d-flex align-items-center justify-content-between">
  									<small class="">
  										<i class="feather-clock"></i> Posted: {{changeStringToTime(item.createdat)}}
  									</small>

                    <small class="">
  										<i class="feather-clock"></i> Deadline: {{changeStringToTime(item.deadline)}}
  									</small>
  								</div>
  							</div>
              </div>
  					</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
@import url('./style.scss');

.gray-bg {
  float: left;
  width: 100%;
  background: $colorPurple;
}
</style>