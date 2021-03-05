<template>
	<main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
		<div class="box shadow-sm rounded bg-white mb-3 overflow-hidden">
			<ul class="nav border-bottom osahan-line-tab" id="myTab" role="tablist">
				<li class="nav-item">
					<nuxt-link :to="'/home'" class="nav-link active" role="tab">About</nuxt-link>
				</li>
				<li class="nav-item">
					<nuxt-link :to="'/home/job'" class="nav-link" role="tab">Jobs</nuxt-link>
				</li>
			</ul>
		</div>

		<div class="tab-content" id="myTabContent">
		  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
			  <div class="box shadow-sm border rounded bg-white mb-3">
			  	<div class="box-title border-bottom p-3">
			  		<h6 class="m-0">About</h6>
			  	</div>
			  	<div v-if="user != null && user.profile != null && user.profile.introduction != null" class="box-body p-3">
			  		{{ user.profile.introduction }}
			  	</div>
          <div v-else class="box-body p-3">
			  		<button type="button" class="btn btn-light w-100 d-flex align-items-center">
              <a-icon class="mr-2" type="plus" /> Add Introduction
            </button>
			  	</div>
			  </div>
        
			  <div class="box shadow-sm border rounded bg-white mb-3">
			  	<div class="box-title border-bottom p-3">
			  		<h6 class="m-0">Overview</h6>
			  	</div>
			  	<div class="box-body">
			  		<table class="table table-borderless mb-0">
			  			<tbody>
                <tr class="border-bottom">
                  <th class="p-3">Email</th>
                  <td v-if="user != null && user.email != null" class="p-3">
                    {{ user.email }}
                  </td>
                </tr>
			  				<tr class="border-bottom">
			  					<th class="p-3">Website</th>
			  					<td  class="p-3">
			  						<template v-if="user != null && user.profile != null && user.profile.pageURL != null">
                      <a :href="user.profile.pageURL">{{ user.profile.pageURL }}</a>
                    </template>
                    <button v-else type="button" class="btn btn-light w-100 d-flex align-items-center">
                      <a-icon class="mr-2" type="plus" /> Add Website
                    </button>
			  					</td>
			  				</tr>
			  				<tr class="border-bottom">
			  					<th class="p-3">Phone</th>
			  					<td class="p-3">
                    <template v-if="user != null && user.profile != null && user.profile.phone != null">
                      <div  class="d-flex align-items-center justify-content-between">
						  <span>{{ user.profile.phone }}</span>
						  <a-button style="border:none" @click="editPhoneClick">
							<a-icon type="edit" />
						  </a-button>
					  </div>
                    </template>

					<template v-else>
                    	<button v-if="!editPhone" type="button" @click="addPhone" class="btn btn-light w-100 d-flex align-items-center">
                    	  <a-icon class="mr-2" type="plus" /> Add Phone
                    	</button>
					</template>

					<div v-if="editPhone">
						<a-input v-model="phone"/>
						<div class="d-flex">
							<a-button class="mt-2 mr-2" @click="cancelPhone">
  					      		Cancel
  					    	</a-button>
							<a-button class="mt-2" type="primary" @click="submitPhone">
  					      		Add
  					    	</a-button>
						</div>
					</div>
                  </td>
			  				</tr>
                <tr class="border-bottom">
			  					<th class="p-3">City</th>
			  					<td class="p-3">
                    <template v-if="user != null && user.profile != null && user.profile.city != null">
                      {{ user.profile.city }}
                    </template>
                    <button v-else type="button" class="btn btn-light w-100 d-flex align-items-center">
                      <a-icon class="mr-2" type="plus" /> Add City
                    </button>
                  </td>
			  				</tr>
                <tr>
                  <th class="p-3">Password</th>
                  <td class="p-3">
                    <button v-if="!isEditPass" type="button" @click="editPass" class="btn btn-light w-100 d-flex align-items-center">
                      Change Password
                    </button>
                    <a-form-model
                      v-else
                      ref="ruleForm"
                      :model="form"
                      :rules="rules"
                    >
                      <a-form-model-item class="mb-1" ref="oldPassword" prop="oldPassword">
                        <a-input-password  v-model="form.oldPassword" placeholder="Old password"/>
                      </a-form-model-item>

                      <a-form-model-item class="mb-1" ref="password" prop="password">
                        <a-input-password  v-model="form.password" placeholder="New password"/>
                      </a-form-model-item>

                      <a-form-model-item class="mb-1" ref="confirmPassword" prop="confirmPassword">
                        <a-input-password  v-model="form.confirmPassword" placeholder="Confirm new password"/>
                      </a-form-model-item>
                      <a-form-model-item>
                        <a-button type="primary" @click="submitPass">
                          Change
                        </a-button>
                        <a-button style="margin-left: 10px;" @click="cancelPass">
                          Cancel
                        </a-button>
                      </a-form-model-item>
                    </a-form-model>
                    <!-- <div v-else>
                      <a-input-password class="mb-2" v-model="form.oldPassword" placeholder="Old password" />
                      <a-input-password class="mb-2" v-model="form.password" placeholder="New password" />
                      <a-input-password v-model="form.confirmPassword" placeholder="Confirm new password" />
                      <div class="d-flex">
						            <a-button class="mt-2 mr-2" @click="cancelPass">
  					              Cancel
  					            </a-button>

						          	<a-button class="mt-2" type="primary" @click="submitPass">
  					              Change
  					            </a-button>
						          </div>
                    </div> -->
                  </td>
                </tr>
			  			</tbody>
			  		</table>
			  	</div>
			  </div>
			  <!-- <div class="box shadow-sm border rounded bg-white mb-3">
			  	<div class="box-title border-bottom p-3">
			  		<h6 class="m-0">Locations</h6>
			  	</div>
			  	<div class="p-3">
			  		<div class="row">
			  			<div class="col-md-6">
			  				<div class="card overflow-hidden">
			  					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501889.172354371!2d73.15671299623955!3d31.003573085499198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964aa569e7355%3A0x8fbd263103a38861!2sPunjab!5e0!3m2!1sen!2sin!4v1575738201305!5m2!1sen!2sin" width="100%" height="150" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
			  					<div class="card-body">
			  						<h6 class="card-title">Postal Address</h6>
			  						<p class="card-text">PO Box 16122 Collins Street West Victoria 8007 Australia</p>
			  						<a href="#" class="text-link font-weight-bold">
			  							<i class="feather-external-link"></i> Get Directions
			  						</a>
			  					</div>
			  				</div>
			  			</div>
			  			<div class="col-md-6">
			  				<div class="card overflow-hidden">
			  					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109552.19658166621!2d75.78663235513761!3d30.900473637624447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a7d%3A0x681102348ec60610!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1575738867148!5m2!1sen!2sin" width="100%" height="150" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
			  					<div class="card-body">
			  						<h6 class="card-title">Envato HQ</h6>
			  						<p class="card-text">121 King Street, Melbourne Victoria 3000 Australia</p>
			  						<a href="#" class="text-link font-weight-bold">
			  							<i class="feather-external-link"></i> Get Directions
			  						</a>
			  					</div>
			  				</div>
			  			</div>
			  		</div>
			  	</div>
			  </div> -->
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