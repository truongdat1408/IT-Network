<template>
  <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
    <div class="box shadow-sm rounded bg-white mb-3 overflow-hidden">
			<div class="my-3 box-title border-bottom p-3 text-center">
			  <h4 class="m-0">{{ job != null ? job.name : '' }}</h4>
        <a-button @click="clickApply" class="font--bold font--18 w-100 mt-3" size="large" type="danger">
          Apply Now
        </a-button>
		  </div>
      <div class="p-3 d-flex align-items-center">
        <a-icon class="mr-3" type="environment" />
        <span>{{ job != null ? job.address.description : ''}}</span>
      </div>

      <div v-if="job != null" class="p-3 job-item-footer d-flex align-items-center justify-content-between">
  			<small class="">
  				<i class="feather-clock"></i> Posted: {{changeStringToTime(job.createdat)}}
  			</small>
        <small class="">
  				<i class="feather-clock"></i> Deadline: {{changeStringToTime(job.deadline)}}
  			</small>
  		</div>
		</div>
  
	<div class="box shadow-sm border rounded bg-white mb-3">
		<div class="box-title border-bottom p-3">
			<h6 class="m-0">Job Details</h6>
		</div>
		<div class="box-body">
			<table class="table table-borderless mb-0">
				<tbody>
					<tr class="border-bottom">
						<th class="p-3">Type</th>
						<td v-if="job != null" class="p-3">{{job.type}}
            </td>
					</tr>
					<tr class="border-bottom">
						<th class="p-3">Experience</th>
            <template v-if="job != null && job.experience != null">
              <td class="p-3">{{ job.experience }} years</td>
            </template>
						<template v-else>
              <td class="p-3">No experience</td>
            </template>
					</tr>

          <tr class="border-bottom">
						<th class="p-3">Lowest Wage</th>
						<td v-if="job != null" class="p-3">{{ job.lowestWage }}$</td>
					</tr>

          <tr class="border-bottom">
						<th class="p-3">Highest Wage</th>
						<td v-if="job != null" class="p-3">{{ job.highestWage }}$</td>
					</tr>

					<tr class="border-bottom">
						<th class="p-3">Category</th>
						<td class="p-3">      
              <div v-if="job != null" class="w-100 px-3 pb-2 ml-1 row">
              <button v-for="(e, index) in job.categories" :key="index" type="button" class="mr-2 mb-2 btn btn-light d-flex align-items-center">
                {{ e.name }}
              </button>
            </div>
          </td>
					</tr>
					<tr class="border-bottom">
						<th class="p-3">Deadline Application</th>
						<td v-if="job != null" class="p-3">{{ job.deadline }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

  <div class="box shadow-sm border rounded bg-white mb-3">
		<div class="box-title border-bottom p-3">
			<h6 class="m-0">Requirement</h6>
		</div>
		<div class="box-body p-3">
			<div v-if="job != null" v-html="job.content">
      </div>
		</div>
	  </div>

    <div class="box shadow-sm border rounded bg-white mb-3">
		<div class="box-title border-bottom p-3">
			<h6 class="m-0">Description</h6>
		</div>
    <div class="d-flex align-items-center p-3 job-item-body">
  	  <img v-if="job != null" width="100%" height="100%" :src="job.introImg" alt="" data-original-title="Sophia Lee">
  	</div>
		<div class="box-body p-3">
			<div v-if="job != null" v-html="job.description">
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