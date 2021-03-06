
const jobList = {
    data() {
      return {
        jobs:[],
        appliedFilters:[],
        count:1
      }
    },
    
    mounted(){
       fetch('./data.json')
       .then(data=>{
           return data.json()
       }).
       then( res=>{
           this.jobs = res;
       })
       .catch(err=>{
           console.log(err)
       })
    },
    methods:{
        applyFilter(filter){
            
            if(!this.appliedFilters.includes(filter)){
                this.appliedFilters.push(filter)
            }
        },
        removeFilter(filter){
            
            this.appliedFilters.splice(this.appliedFilters.indexOf(filter),1)
            
        },
        clearAllFilters(){
            this.appliedFilters = [];
        },
        getTopMargin(){
            console.log("what th ehelel");
            let style = {marginTop:"0px"}
            if (this.appliedFilters.length){
                style.marginTop = "10rem";
            }
            return style;
        }


    }
    ,
    computed:{
        addJobFilters(){
            console.log(this.jobs)
            this.jobs.forEach(job=>{
                // job.filters = [];
                // job.filters.push(job.role);
                // job.filters.push(job.level);
                // job.filters=job.filters.concat(job.languages);
                // job.filters=job.filters.concat(job.tools);
                job.filters = [job.role,job.level,...job.languages,...job.tools]
                // console.log(job.filters)
            })
        },
        filteredJobs(){
            this.addJobFilters
            if (this.appliedFilters.length){

                return this.jobs.filter(job=>{
                    let isFiltered = true;
                    this.appliedFilters.forEach(filter=>{

                        if(!job.filters.includes(filter)){
                            isFiltered = false
                        }
                    })
                    return isFiltered;
                })
                
            }
            return this.jobs;

        }
    }

  }
  
  Vue.createApp(jobList).mount('.filteredList')