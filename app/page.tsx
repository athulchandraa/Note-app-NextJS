import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <div className="min-h-screen md:grid grid-cols-2 p-5 justify-center items-center">
      <div>
        <p className="text-4xl font-medium mb-2 text-green-600">Note Hub</p>
        <p className="text-2xl mb-5">Your Perfect Note app</p>
        <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda sequi quis doloribus sapiente amet! Repellendus nemo illum soluta? Incidunt nobis harum distinctio esse amet ratione dolor impedit placeat autem aliquam!
        Eaque, aliquam! Quod fugiat ab quaerat dolore officia, fuga atque nam similique ipsum sequi ex distinctio aut excepturi et repellendus odit doloremque. Harum reprehenderit numquam necessitatibus repellendus inventore. Laborum, fugiat.
        Soluta similique mollitia provident voluptatem corrupti rem excepturi expedita sunt aspernatur earum cumque quis, quaerat illum fugiat laboriosam neque quibusdam magnam vel sequi! Excepturi voluptate at ut hic consequuntur. Sed!
        Veritatis, odio iusto eaque omnis suscipit libero nostrum. Corrupti quia voluptatem, ipsam optio vitae nulla molestiae porro. Hic vitae fuga enim, adipisci eum odio aut quia ab corrupti modi nostrum.</p>
        <div className="mt-5 "><Link href={'/login'} className="px-3 py-1.5 bg-green-600 text-white font-medium rounded cursor-pointer mt-5">Explore Now</Link></div>
      </div>
      <div className="flex justify-center items-center">
        <Image width={'500'} height={'500'} src={'/landing.gif'} alt="Landing Image"></Image>
      </div>
    </div>
  );
}
