<template>
  <div>
    <DataTable
      :value="users"
      :paginator="true"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      :rows="5"
      :autoLayout="true"
      @page="onPage($event)"
    >
      <Column field="picture.medium">
        <template #body="{ data }">
          <Avatar :image = "data.picture.large" shape ="circle" size="xlarge" />
        </template>
      </Column>
      <Column field="name.first" header="Name" :sortable="true">
        <template #body="{ data }"> {{ data.name.first }} {{ data.name.last }} </template>
      </Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Phone #">
        <template
          #body="{ data }"> {{ data.phone }} 
        </template>
      </Column>
      <Column field="gender" header="Gender">
        <template #body="{ data }"
          >{{ data.gender }}
        </template>
      </Column>
      <Column field="location" header="Address">
        <template #body="{ data }">
          {{ data.location.street.number }} {{ data.location.street.name }}, {{ data.location.city }},
          {{ data.location.state }}, {{ data.location.country }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import router from '../router/index';
import { RouteName } from '@/constants/route-names';
import IUsers from '../interface/users';
import IPage from '../interface/page';
import Avatar from 'primevue/avatar';

export default defineComponent({
  name: 'UserList',
  components: { DataTable, Column, Avatar },
  props: {
    users: {
      type: Object as PropType<IUsers>,
      required: true,
      default(){
        return null;
      },
    },
  },
  setup(){
    const pageNumber = ref(1);
    const maxPage = ref(1);

    function onPage<Type extends IPage>(event: Type) {
      pageNumber.value = event.page + 1;
      maxPage.value = event.pageCount;
      router.push({ name: RouteName.List, params: { page: pageNumber.value.toString() } });
    }
  return { onPage }
  }
});
</script>