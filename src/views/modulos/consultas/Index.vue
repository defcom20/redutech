<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useToast } from 'primevue/usetoast';
import InputNumber from 'primevue/inputnumber';

const toast = useToast();

const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

const productService = new ProductService();

const getBadgeSeverity = (inventoryStatus) => {
    switch (inventoryStatus.toLowerCase()) {
        case 'presencial':
            return 'success';
        case 'facebook':
            return 'blue';
        case 'tikTok':
            return 'black';
        case 'instagram':
            return 'danger';
        default:
            return 'info';
    }
};

onBeforeMount(() => {
    initFilters();
});
onMounted(() => {
    productService.getProducts().then((data) => (products.value = data));
});
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

const bodyStyle_ = ref('paddong: 0px !important;');
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toolbar class="mb-2">
                    <template v-slot:start>
                        <div>
                            <Button label="Nueva Consulta" icon="pi pi-plus" class="mr-2" severity="success"
                                @click="openNew" />
                            <Button label="Elminar" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                                :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import"
                            chooseLabel="Import" class="mr-2 inline-block bg-green-600" />
                        <Button label="Export" icon="pi pi-download" severity="help" class="bg-purple-600"
                            @click="exportCSV($event)" />
                    </template>
                </Toolbar>


                <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"
                    :paginator="true" :rows="5" :filters="filters" size="small"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[3, 5, 10, 25]"
                    currentPageReportTemplate="Mostrando  {first} a {last} de {totalRecords} consultas">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Listado de Consutlas</h5>
                            <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                <InputIcon class="pi pi-search" />
                                <InputText class="w-full sm:w-auto" v-model="filters['global'].value"
                                    placeholder="Buscar..." />
                            </IconField>
                        </div>
                    </template>
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="code" header="DNI" :sortable="false"
                        headerStyle="width:10%; min-width:8rem; background: #f8f9fa">
                        <template #body="slotProps">
                            <span class="p-column-title">DNI</span>
                            {{ slotProps.data.dni }}
                        </template>
                    </Column>
                    <Column field="name" header="NOMBRES Y APELLIDOS" :sortable="false"
                        headerStyle="width:100%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Name</span>
                            {{ slotProps.data.nombre_completos }}
                        </template>
                    </Column>
                    <Column field="price" header="CELULAR" :sortable="false" headerStyle="width:14%; min-width:8rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Price</span>
                            {{ formatCurrency(slotProps.data.celular) }}
                        </template>
                    </Column>
                    <Column field="category" header="PAQUETE" :sortable="false"
                        headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Category</span>
                            {{ slotProps.data.paquete }}
                        </template>
                    </Column>
                    <Column field="inventoryStatus" header="COMUNICACIÓN" :sortable="false"
                        headerStyle="width:100%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Status</span>
                            <Tag :severity="getBadgeSeverity(slotProps.data.estado)">{{
                                slotProps.data.estado }}</Tag>
                        </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-eye" class="mr-2" severity="info" rounded
                                @click="editProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Nueva Consulta"
                    :modal="true" class="p-fluid">
                    <img :src="'/demo/images/product/' + product.image" :alt="product.image" v-if="product.image"
                        width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="name">DNI</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus
                            :invalid="submitted && !product.name" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="description">Nombre y Apellidos</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus
                            :invalid="submitted && !product.name" />
                    </div>
                    <div class="field">
                        <label for="description">Celular</label>
                        <InputNumber id="name" v-model.trim="product.name" required="true" autofocus
                            :invalid="submitted && !product.name" />
                    </div>

                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Paquete</label>
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses"
                            optionLabel="label" placeholder="Seleccionar Paquete">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{
                                        slotProps.value.label }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{
                                        slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>

                    <div class="field">
                        <label class="mb-3">MEDIO COMUNICACIÓN</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category1" name="category" value="Presencial"
                                    v-model="product.category" />
                                <label for="category1">Presencial</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category2" name="category" value="Facebook"
                                    v-model="product.category" />
                                <label for="category2">Facebook</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category3" name="category" value="TikTok" v-model="product.category" />
                                <label for="category3">TikTok</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="category4" name="category" value="Instagram"
                                    v-model="product.category" />
                                <label for="category4">Instagram</label>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label for="description">Descripcion</label>
                        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
                    </div>

                    <!-- <div class="formgrid grid">
                        <div class="field col">
                            <label for="price">Price</label>
                            <InputNumber id="price" v-model="product.price" mode="currency" currency="USD"
                                locale="en-US" :invalid="submitted && !product.price" :required="true" />
                            <small class="p-invalid" v-if="submitted && !product.price">Price is required.</small>
                        </div>
                        <div class="field col">
                            <label for="quantity">Quantity</label>
                            <InputNumber id="quantity" v-model="product.quantity" integeronly />
                        </div>
                    </div> -->
                    <template #footer>
                        <Button label="Cancelar" icon="pi pi-times" text="" @click="hideDialog" />
                        <Button label="Registrar" icon="pi pi-check" text="" @click="saveProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm"
                    :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm"
                    :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Are you sure you want to delete the selected products?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                        <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
