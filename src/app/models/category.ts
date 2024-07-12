export interface mainCategory {
 category:string;
}

export interface allCategory {
    category:string;
    subCategory:string;
   }

   export interface addCategory {
    categoryname:string;
   
   }
   export interface UpCategory {
    jobcategory:any;
    oldCategory:string;
   }
   export interface UpSubCategory {
    catInfo:any;
    oldCategory:string;
   }
   export interface addSubCategory {
    mainCatId:string;
    categoryData:any;
   
   }

   