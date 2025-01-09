<script setup>

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter} from 'vue-router'
import BackButton from '@/components/BackButton.vue';
import { useToast } from 'vue-toastification'; 

const route = useRoute();
const router = useRouter();
const toast = useToast();

const jobId = route.params.id;
const state = reactive({
    job: {},
    isLoading: true
})

const deleteJob = async () => {
    try {
        const confirm = window.confirm('Are you sure you want to delete this job?');
        if(confirm) {
            await axios.delete(`/api/jobs/${jobId}`);
            router.push('/jobs');
            toast.success('Job deleted successfully');
        }
        
    } catch(error) {
        console.error('Error deleting job', error);
        toast.error('Job not deleted');
    }
}

onMounted(async () => {
    try {
        const response = await axios.get(`/api/jobs/${jobId}`);
        state.job = response.data;
    } catch(error) {
        console.log('Error fetching job', error);
    } finally {
        state.isLoading = false;
    }
})
</script>

<template>
    <BackButton />
    <section v-if="!state.isLoading" class="bg-green-50">
  <div class="container mx-auto py-12 px-6">
    <div class="grid grid-cols-1 md:grid-cols-[70%,30%] gap-8">
      <!-- Main Content -->
      <main>
        <!-- Job Overview -->
        <div class="bg-white p-8 rounded-lg shadow-lg text-center md:text-left">
          <div class="text-gray-500 uppercase tracking-wide mb-4 font-medium">{{ state.job.type }}</div>
          <h1 class="text-4xl font-extrabold text-gray-800 mb-6">{{ state.job.title }}</h1>
          <div class="text-gray-600 flex items-center justify-center md:justify-start space-x-2">
            <i class="fa-solid fa-location-dot text-xl text-orange-600"></i>
            <span class="text-orange-700 font-medium">{{ state.job.location }}</span>
          </div>
        </div>

        <!-- Job Description -->
        <div class="bg-white p-8 rounded-lg shadow-lg mt-8">
          <h3 class="text-green-800 text-2xl font-bold mb-4">Job Description</h3>
          <p class="text-gray-700 mb-6 leading-relaxed">
            {{ state.job.description }}
          </p>
          <h3 class="text-green-800 text-xl font-bold mb-2">Salary</h3>
          <p class="text-gray-700 text-lg">{{ state.job.salary }}</p>
        </div>
      </main>

      <!-- Sidebar -->
      <aside>
        <!-- Company Info -->
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-6 text-gray-800">Company Info</h3>
          <h2 class="text-xl text-gray-900 font-semibold">{{ state.job.company.name }}</h2>
          <p class="text-gray-700 mt-4 leading-relaxed">
            {{ state.job.company.description }}
          </p>
          <hr class="my-6">
          <h3 class="text-lg font-bold text-gray-800">Contact Information</h3>
          <p class="bg-green-100 p-3 rounded-md font-semibold text-green-900 mt-4">{{ state.job.company.contactEmail }}</p>
          <p class="bg-green-100 p-3 rounded-md font-semibold text-green-900 mt-4">Phone: {{ state.job.company.contactPhone }}</p>
        </div>

        <!-- Manage Job -->
        <div class="bg-white p-8 rounded-lg shadow-lg mt-8">
          <h3 class="text-2xl font-bold mb-6 text-gray-800">Manage Job</h3>
          <RouterLink
            :to="`/jobs/edit/${state.job.id}`"
            class="block bg-green-500 hover:bg-green-600 text-white text-center font-bold py-3 px-4 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-green-300"
            aria-label="Edit Job"
          >
            Edit Job
          </RouterLink>
          <button @click="deleteJob"
            class="block bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg w-full mt-4 focus:outline-none focus:ring-4 focus:ring-red-300"
            aria-label="Delete Job"
          >
            Delete Job
          </button>
        </div>
      </aside>
    </div>
  </div>
</section>


        <div v-else class="text-center text-gray-500 py-6">
            <PulseLoader />
        </div>
    
</template>