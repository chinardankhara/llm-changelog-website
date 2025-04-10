Failed to generate changelog due to an error: Empty or invalid response structure from LLM. Inner error: Invalid operation: The `response.parts` quick accessor requires a single candidate, but but `response.candidates` is empty.

Raw commit data has been included below:

# Commits between v3.5.4 and v4.0.0-rc4

- 6fe9737: [SPARK-51233][BUILD] Update `pom.xml` to use `https` for `licenses` element

### What changes were proposed in this pull request?

This PR aims to update `pom.xml` to use `https` for `licenses` element like ASF parent `pom.xml` for Apache Spark 4.0.0.

### Why are the changes needed?

ASF parent `pom.xml` file switched to `https` for `licenses` element almost 9 years ago (May 12, 2016)
- [MPOM-116](https://issues.apache.org/jira/browse/MPOM-116) Use https wherever possible
  - https://github.com/apache/maven-apache-parent/commit/6dfc92ab89f6f8e5f8eb4c40707d2e72828fa2f8

Note that the existing link of Apache Spark code was a part of the initial commit during donating Spark to ASF foundation on Sep 1, 2013.
- https://github.com/apache/spark/commit/46eecd110a4017ea0c86cbb1010d0ccd6a5eb2ef

### Does this PR introduce _any_ user-facing change?

No, there is no behavior change. This is only updating a metadata of pom.xml.

### How was this patch tested?

Manual review.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49974 from dongjoon-hyun/SPARK-51233.

Authored-by: Dongjoon Hyun <dongjoon@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit e5a0ee9ce37df594892185506bdc84a39da156fa)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Dongjoon Hyun on 2025-02-17T03:02:18Z)
- 6a7a710: [SPARK-51215][ML][PYTHON][CONNECT] Add a helper function to invoke helper model attr

### What changes were proposed in this pull request?
Add a helper function to invoke helper model attr

### Why are the changes needed?
deduplicate code

### Does this PR introduce _any_ user-facing change?
no, minor refactor

### How was this patch tested?
existing tests

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #49951 from zhengruifeng/ml_connect_invoke_help_attr.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org>
(cherry picked from commit b3dac8814a61d094c2ed8ec2136018c82ace9fbf)
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by Ruifeng Zheng on 2025-02-17T03:03:19Z)
- a6298d1: [SPARK-51217][ML][CONNECT] ML model helper constructor clean up

### What changes were proposed in this pull request?
ML model helper constructor clean up:
1, add comments;
2, set invalid values, e.g. empty uid, NaN efficient

### Why are the changes needed?
1, to avoid unintentionally incorrect usage;
2, to differentiate from normal models;

### Does this PR introduce _any_ user-facing change?
no, internal change

### How was this patch tested?
existing tests

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #49956 from zhengruifeng/ml_connect_const.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org>
(cherry picked from commit d75a7d6fbe4ab97dbaa78200e5d01a4bfce13736)
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by Ruifeng Zheng on 2025-02-17T03:07:07Z)
- dec92b6: [SPARK-51235][K8S][DOCS] Update `YuniKorn` docs with `1.6.1`

### What changes were proposed in this pull request?

This PR aims to update `YuniKorn` docs with v1.6.1 for Apache Spark 4.0.0.

### Why are the changes needed?

Apache YuniKorn v1.6.1 was released on 2025-01-24 with 12 [JIRAs](https://issues.apache.org/jira/issues/?filter=12353775#) issues.

  - https://yunikorn.apache.org/release-announce/1.6.1/

I installed YuniKorn v1.6.1 on K8s 1.31 and tested manually.

**K8s v1.31**
```
$ kubectl version
Client Version: v1.32.2
Kustomize Version: v5.5.0
Server Version: v1.31.4
```

**YuniKorn v1.6.1**
```
$ helm list -n yunikorn
NAME    	NAMESPACE	REVISION	UPDATED                             	STATUS  	CHART         	APP VERSION
yunikorn	yunikorn 	1       	2025-02-16 19:13:40.251713 -0800 PST	deployed	yunikorn-1.6.1
```

```
$ build/sbt -Pkubernetes -Pkubernetes-integration-tests -Dspark.kubernetes.test.deployMode=docker-desktop "kubernetes-integration-tests/testOnly *.YuniKornSuite" -Dtest.exclude.tags=minikube,local,decom,r -Dtest.default.exclude.tags=
...
[info] YuniKornSuite:
...
[info] Run completed in 7 minutes, 16 seconds.
[info] Total number of tests run: 27
[info] Suites: completed 1, aborted 0
[info] Tests: succeeded 27, failed 0, canceled 2, ignored 2, pending 0
[info] All tests passed.
[success] Total time: 453 s (07:33), completed Feb 16, 2025, 7:28:52 PM
```

```
Events:
  Type    Reason             Age   From      Message
  ----    ------             ----  ----      -------
  Normal  Scheduling         9s    yunikorn  spark-3261ae21f56f4250980e111d24e45d53/spark-test-app-e9c45e585ed54a55a526084f74437975-driver is queued and waiting for allocation
  Normal  Scheduled          9s    yunikorn  Successfully assigned spark-3261ae21f56f4250980e111d24e45d53/spark-test-app-e9c45e585ed54a55a526084f74437975-driver to node docker-desktop
  Normal  PodBindSuccessful  9s    yunikorn  Pod spark-3261ae21f56f4250980e111d24e45d53/spark-test-app-e9c45e585ed54a55a526084f74437975-driver is successfully bound to node docker-desktop
  Normal  Pulled             9s    kubelet   Container image "docker.io/kubespark/spark:dev" already present on machine
  Normal  Created            9s    kubelet   Created container spark-kubernetes-driver
  Normal  Started            9s    kubelet   Started container spark-kubernetes-driver
```

Closes #49976 from dongjoon-hyun/SPARK-51235.

Authored-by: Dongjoon Hyun <dongjoon@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit ec9086284de6181e36345f37266d0c1c5f44d7ac)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Dongjoon Hyun on 2025-02-17T03:38:52Z)
- 4e99410: [SPARK-51183][SQL] Link to Parquet spec in Variant docs

### What changes were proposed in this pull request?

The Parquet spec in https://github.com/apache/parquet-format/blob/master/VariantEncoding.md is based on the one in Spark, but has received a number of updates (especially related to Shredding).

At this point, the code in Spark more closely matches the latest version of the Parquet spec (the main gap being the lack of a few new scalar types that were recently added, and which we will try to add to Spark soon).

This PR updates the README.md and shredding.md files to just point to the Parquet spec, which we plan to have the Spark code follow.

### Why are the changes needed?

Improve internal documentation and avoid maintaining two copies of the spec.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

None.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49910 from cashmand/fix_variant_readme.

Authored-by: cashmand <david.cashman@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit b63b90e4c55d7b4f8de6ea2d75fe18cd92c0869d)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by cashmand on 2025-02-17T04:21:54Z)
- 8ad2a52: [SPARK-51238][K8S][INFRA][DOCS] Upgrade Volcano to 1.11.0

### What changes were proposed in this pull request?

This PR aims to upgrade `Volcano` to 1.11.0 in K8s integration test document and GA job.

### Why are the changes needed?

- https://github.com/volcano-sh/volcano/releases/tag/v1.11.0
  - [Supports Kubernetes v1.31](https://github.com/volcano-sh/volcano/pull/3767)
  - [Topology Aware Scheduling](https://volcano.sh/en/docs/network_topology_aware_scheduling/)
  - [Hierarchical Queue](https://volcano.sh/en/docs/hierarchical_queue/)
  - [Multi-cluster Scheduling](https://volcano.sh/en/docs/multi_cluster_scheduling/)
  - [Load-aware Descheduling](https://volcano.sh/en/docs/descheduler/)
  - [Fine-Grained Job Failure Recovery Strategies](https://github.com/volcano-sh/volcano/blob/master/docs/user-guide/how_to_use_job_policy.md)

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Pass GA.

I also manually verified.

```
$ build/sbt -Pvolcano -Pkubernetes -Pkubernetes-integration-tests \
        -Dtest.include.tags=volcano \
        -Dtest.exclude.tags=minikube \
        -Dspark.kubernetes.test.deployMode=docker-desktop \
        'kubernetes-integration-tests/test'
...
[info] KubernetesSuite:
[info] VolcanoSuite:
[info] - Run SparkPi with volcano scheduler (8 seconds, 770 milliseconds)
[info] - SPARK-38187: Run SparkPi Jobs with minCPU (31 seconds, 578 milliseconds)
[info] - SPARK-38187: Run SparkPi Jobs with minMemory (27 seconds, 576 milliseconds)
[info] - SPARK-38188: Run SparkPi jobs with 2 queues (only 1 enabled) (14 seconds, 267 milliseconds)
[info] - SPARK-38188: Run SparkPi jobs with 2 queues (all enabled) (16 seconds, 252 milliseconds)
[info] - SPARK-38423: Run driver job to validate priority order (18 seconds, 473 milliseconds)
[info] YuniKornSuite:
[info] Run completed in 2 minutes, 30 seconds.
[info] Total number of tests run: 6
[info] Suites: completed 3, aborted 0
[info] Tests: succeeded 6, failed 0, canceled 0, ignored 0, pending 0
[info] All tests passed.
[success] Total time: 441 s (07:21), completed Feb 16, 2025, 7:55:30 PM
```

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49977 from dongjoon-hyun/SPARK-51238.

Authored-by: Dongjoon Hyun <dongjoon@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 4c37a7a1af6b4643430bb0970674052a92771c84)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Dongjoon Hyun on 2025-02-17T04:54:03Z)
- 1b84e50: [SPARK-42746][SQL][FOLLOWUP] Correct the comments for SupportsOrderingWithinGroup and Mode

### What changes were proposed in this pull request?
This PR propose to correct the comments for `SupportsOrderingWithinGroup` and `Mode`.

### Why are the changes needed?
First, some comments added with incorrect style.
Second, replace `QueryCompilationErrors.functionMissingWithinGroupError` with the correct `QueryCompilationErrors.distinctWithOrderingFunctionUnsupportedError`.

### Does this PR introduce _any_ user-facing change?
'No'.
New feature.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #49907 from beliefer/SPARK-42746_followup2.

Lead-authored-by: beliefer <beliefer@163.com>
Co-authored-by: Jiaan Geng <beliefer@163.com>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit 0002cdd6ea1f2be79611a89b0976ecb86f21c05f)
Signed-off-by: beliefer <beliefer@163.com> (by beliefer on 2025-02-17T06:25:49Z)
- 93a2a6d: [SPARK-50692][SQL][FOLLOWUP] Add comments for LPAD and RPAD

### What changes were proposed in this pull request?
This PR propose to add comments for `LPAD` and `RPAD`.

### Why are the changes needed?
https://github.com/apache/spark/pull/49325 had added pushdown support for `LPAD` and `RPAD`. But forget the comments.

### Does this PR introduce _any_ user-facing change?
'No'.
New feature.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #49957 from beliefer/SPARK-50692_followup.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit e1f7851bdee84c63e1bf17454e3f7e30999e6ee1)
Signed-off-by: beliefer <beliefer@163.com> (by beliefer on 2025-02-17T06:32:42Z)
- f9c5eb8: [SPARK-51237][SS] Add API details for new transformWithState helper APIs as needed

### What changes were proposed in this pull request?
Add API details for new transformWithState helper APIs as needed

### Why are the changes needed?
Improve API docs for user reference

### Does this PR introduce _any_ user-facing change?
Yes

### How was this patch tested?
Comments only change. Existing unit tests

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #49978 from anishshri-db/task/SPARK-51237.

Authored-by: Anish Shrigondekar <anish.shrigondekar@databricks.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 17b943106b713d39767dc63110c9e2e878e6dd1c)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Anish Shrigondekar on 2025-02-17T12:56:16Z)
- 7197079: [SPARK-51192][CONNECT] Expose `processWithoutResponseObserverForTesting` in `SparkConnectPlanner`

### What changes were proposed in this pull request?

Adds a new `processWithoutResponseObserverForTesting` private-package method scoped to `planner`. This method is called by `SparkConnectPlannerTestUtils#transform`.

### Why are the changes needed?

https://github.com/apache/spark/pull/47816 attempted to move `MockObserver` into source code to address compilation errors when open-source libraries attempt to test their command plugin extensions via the `SparkConnectPlannerUtils`.

However, this isn't enough as the error `java.lang.NoSuchMethodError: 'void org.apache.spark.sql.connect.planner.SparkConnectPlanner.process(org.apache.spark.connect.proto.Command, io.grpc.stub.StreamObserver` continues to be seen.

To address this shading issue, we move the creation of the `MockObserver` to the source code.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Existing tests

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49921 from vicennial/SPARK-51192.

Authored-by: vicennial <venkata.gudesa@databricks.com>
Signed-off-by: Herman van Hovell <herman@databricks.com>
(cherry picked from commit 479e0b34c4c99e6bd5ebf8ce1524d8616e6e3d3e)
Signed-off-by: Herman van Hovell <herman@databricks.com> (by vicennial on 2025-02-17T13:41:52Z)
- 4b6ce03: [SPARK-50849][CONNECT] Add example project to demonstrate Spark Connect Server Libraries

### What changes were proposed in this pull request?

This PR adds a sample project, `server-library-example` (under a new directory `connect-examples`) to demonstrate the workings of using Spark Connect Server Libraries (see https://github.com/apache/spark/pull/48922 for context).
The sample project contains several modules (`common`, `server` and `client`) to showcase how a user may choose to extend the Spark Connect protocol with custom functionality.

### Why are the changes needed?

Currently, there are limited resources and documentation to aid a user in building their own Spark Connect Server Libraries. This PR aims to bridge this gap by providing an exoskeleton of a project to work with.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
N/A

### Was this patch authored or co-authored using generative AI tooling?

Generated-by: Copilot

-------------------- Render of `README.md` below ----------------
# Spark Server Library Example - Custom Datasource Handler

This example demonstrates a modular maven-based project architecture with separate client, server
and common components. It leverages the extensibility of Spark Connect to create a server library
that may be attached to the server to extend the functionality of the Spark Connect server as a whole. Below is a detailed overview of the setup and functionality.

## Project Structure

```
├── common/                # Shared protobuf/utilities/classes
├── client/                # Sample client implementation
│   ├── src/               # Source code for client functionality
│   ├── pom.xml            # Maven configuration for the client
├── server/                # Server-side plugin extension
│   ├── src/               # Source code for server functionality
│   ├── pom.xml            # Maven configuration for the server
├── resources/             # Static resources
├── pom.xml                # Parent Maven configuration
```

## Functionality Overview

To demonstrate the extensibility of Spark Connect, a custom datasource handler, `CustomTable` is
implemented in the server module. The class handles reading, writing and processing data stored in
a custom format, here we simply use the `.custom` extension (which itself is a wrapper over `.csv`
files).

First and foremost, the client and the server must be able to communicate with each other through
custom messages that 'understand' our custom data format. This is achieved by defining custom
protobuf messages in the `common` module. The client and server modules both depend on the `common`
module to access these messages.
- `common/src/main/protobuf/base.proto`: Defines the base `CustomTable` which is simply represented
by a path and a name.
```protobuf
message CustomTable {
  string path = 1;
  string name = 2;
}
```
- `common/src/main/protobuf/commands.proto`: Defines the custom commands that the client can send
to the server. These commands are typically operations that the server can perform, such as cloning
an existing custom table.
```protobuf
message CustomCommand {
  oneof command_type {
    CreateTable create_table = 1;
    CloneTable clone_table = 2;
  }
}
```
- `common/src/main/protobuf/relations.proto`: Defines custom `relations`, which are a mechanism through which an optional input dataset is transformed into an
  output dataset such as a Scan.
```protobuf
message Scan {
  CustomTable table = 1;
}
```

On the client side, the `CustomTable` class mimics the style of Spark's `Dataset` API, allowing the
user to perform and chain operations on a `CustomTable` object.

On the server side, a similar `CustomTable` class is implemented to handle the core functionality of
reading, writing and processing data in the custom format. The plugins (`CustomCommandPlugin` and
`CustomRelationPlugin`) are responsible for processing the custom protobuf messages sent from the client
(those defined in the `common` module) and delegating the appropriate actions to the `CustomTable`.

## Build and Run Instructions

1. **Navigate to the sample project from `SPARK_HOME`**:
   ```bash
   cd connect-examples/server-library-example
   ```

2. **Build and package the modules**:
   ```bash
   mvn clean package
   ```

3. **Download the `4.0.0-preview2` release to use as the Spark Connect Server**:
   - Choose a distribution from https://archive.apache.org/dist/spark/spark-4.0.0-preview2/.
   - Example: `curl -L https://archive.apache.org/dist/spark/spark-4.0.0-preview2/spark-4.0.0-preview2-bin-hadoop3.tgz | tar xz`

4. **Copy relevant JARs to the root of the unpacked Spark distribution**:
   ```bash
    cp \
    <SPARK_HOME>/connect-examples/server-library-example/resources/spark-daria_2.13-1.2.3.jar \
    <SPARK_HOME>/connect-examples/server-library-example/common/target/spark-server-library-example-common-1.0-SNAPSHOT.jar \
    <SPARK_HOME>/connect-examples/server-library-example/server/target/spark-server-library-example-server-extension-1.0-SNAPSHOT.jar \
    .
   ```
5. **Start the Spark Connect Server with the relevant JARs**:
   ```bash
    bin/spark-connect-shell \
   --jars spark-server-library-example-server-extension,spark-server-library-example-common-1.0-SNAPSHOT.jar,spark-daria_2.13-1.2.3.jar \
   --conf spark.connect.extensions.relation.classes=org.example.CustomRelationPlugin \
   --conf spark.connect.extensions.command.classes=org.example.CustomCommandPlugin
   ```
6. **In a different terminal, navigate back to the root of the sample project and start the client**:
   ```bash
   java -cp client/target/spark-server-library-client-package-scala-1.0-SNAPSHOT.jar org.example.Main
   ```
7. **Notice the printed output in the client terminal as well as the creation of the cloned table**:
```protobuf
Explaining plan for custom table: sample_table with path: <SPARK_HOME>/spark/connect-examples/server-library-example/client/../resources/dummy_data.custom
== Parsed Logical Plan ==
Relation [id#2,name#3] csv
== Analyzed Logical Plan ==
id: int, name: string
Relation [id#2,name#3] csv
== Optimized Logical Plan ==
Relation [id#2,name#3] csv
== Physical Plan ==
FileScan csv [id#2,name#3] Batched: false, DataFilters: [], Format: CSV, Location: InMemoryFileIndex(1 paths)[file:/Users/venkata.gudesa/spark/connect-examples/server-library-example/resou..., PartitionFilters: [], PushedFilters: [], ReadSchema: struct<id:int,name:string>
Explaining plan for custom table: cloned_table with path: <SPARK_HOME>/connect-examples/server-library-example/client/../resources/cloned_data.custom
== Parsed Logical Plan ==
Relation [id#2,name#3] csv
== Analyzed Logical Plan ==
id: int, name: string
Relation [id#2,name#3] csv
== Optimized Logical Plan ==
Relation [id#2,name#3] csv
== Physical Plan ==
FileScan csv [id#2,name#3] Batched: false, DataFilters: [], Format: CSV, Location: InMemoryFileIndex(1 paths)[file:/Users/venkata.gudesa/spark/connect-examples/server-library-example/resou..., PartitionFilters: [], PushedFilters: [], ReadSchema: struct<id:int,name:string>
```

Closes #49604 from vicennial/connectExamples.

Authored-by: vicennial <venkata.gudesa@databricks.com>
Signed-off-by: Herman van Hovell <herman@databricks.com>
(cherry picked from commit bd2b4782ccf88575a60505e4064417689d6236a9)
Signed-off-by: Herman van Hovell <herman@databricks.com> (by vicennial on 2025-02-17T13:43:59Z)
- 991c6e8: [SPARK-51085][SQL] Restore SQLContext Companion

### What changes were proposed in this pull request?
The companion object for SQLContext was accidentally dropped when we swapped the interface and the implementation. This PR restores the companion.

### Why are the changes needed?
The SQLContext Companion is part of the

### Does this PR introduce _any_ user-facing change?
No. Well it mitigates a potentially user facing change.

### How was this patch tested?
I added a test to `SparkSessionBuilderImplementationBindingSuite`.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #49964 from hvanhovell/SPARK-51085.

Authored-by: Herman van Hovell <herman@databricks.com>
Signed-off-by: Herman van Hovell <herman@databricks.com>
(cherry picked from commit aeea73867858025497dbe0689674549395ddf153)
Signed-off-by: Herman van Hovell <herman@databricks.com> (by Herman van Hovell on 2025-02-17T13:45:44Z)
- bff980f: [SPARK-51234][PYTHON][DOCS] Document an import change in `from pyspark.sql.functions import *`

### What changes were proposed in this pull request?
Document an import change in `from pyspark.sql.functions import *`

### Why are the changes needed?
to notify users

### Does this PR introduce _any_ user-facing change?
doc-only

### How was this patch tested?
ci

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #49975 from zhengruifeng/py_funcs_wildcard_import.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org>
(cherry picked from commit 2c76dff9536d409e97ae3692dec2705f9de7f6ac)
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by Ruifeng Zheng on 2025-02-18T02:19:34Z)
- 01edac4: [SPARK-51219][SQL] Fix `ShowTablesExec.isTempView` to work with non-`V2SessionCatalog` catalogs

### What changes were proposed in this pull request?

When non buildin catalog is configured (for example, `org.apache.spark.sql.delta.catalog.DeltaCatalog`) and there is a temp table in catalog, running catalog listTable will fail:
```scala
spark.conf.set("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")

spark.range(0,2).createOrReplaceTempView("abc")
spark.catalog.listTables().show()

// org.apache.spark.sql.catalyst.parser.ParseException:
// [PARSE_EMPTY_STATEMENT] Syntax error, unexpected empty statement. SQLSTATE: 42617 (line 1, pos 0)
//
// == SQL ==
//
// ^^^
```

If default `V2SessionCatalog` catalog is in use, or there are no temp tables, the same command run without issues.

This behavior is due to `ShowTablesExec. isTempView ` method, where only for `V2SessionCatalog` catalogs dedicated `isTempView` is executed. This PR fixes that, by using `session.sessionState.catalog.isTempView` instead.

### Why are the changes needed?

To avoid unnecessary fails when a non-buildin v2 catalog is in use.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

New unit tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49959 from ostronaut/features/fix-ShowTablesExec-isTempView.

Authored-by: Dima <dimanowq@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit aa37f89811878d9993962c75b73025bcadcbb6f5)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dima on 2025-02-18T12:46:08Z)
- a6ad0d9: [SPARK-51241][SQL][TESTS] Add test cases with ignore nulls for ANY_VALUE

### What changes were proposed in this pull request?
This PR proposes to add test cases with ignore nulls for `ANY_VALUE`.

### Why are the changes needed?
According to the discussion at https://github.com/apache/spark/pull/49981#discussion_r1959439297

### Does this PR introduce _any_ user-facing change?
'No'.

### How was this patch tested?
GA

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #49990 from beliefer/SPARK-51241_new.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: Max Gekk <max.gekk@gmail.com>
(cherry picked from commit 6dbd12a81c22fac2d75b417515cf665f4190cdde)
Signed-off-by: Max Gekk <max.gekk@gmail.com> (by beliefer on 2025-02-18T20:47:48Z)
- 3000f94: [SPARK-50767][SQL] Remove codegen of `from_json`

### What changes were proposed in this pull request?

This reopens https://github.com/apache/spark/pull/49411 to fix the performance regression in 4.0.

### Why are the changes needed?

It's non-trivial to support CSE for Filter in whole stage codegen. We should not rush but revert the codegen support in 4.0 so that we have more time to get it right in 4.1.

Note: 4.0 also adds codegen support for a few other expressions, but `from_json` is special as it's quite expensive and the performance regression is very significant with it.

### Does this PR introduce _any_ user-facing change?

no

### How was this patch tested?

N/A

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #49992 from cloud-fan/json.

Authored-by: Wenchen Fan <wenchen@databricks.com>
Signed-off-by: Max Gekk <max.gekk@gmail.com>
(cherry picked from commit a8b694f4d3dcac684290282c40f52f947b50942b)
Signed-off-by: Max Gekk <max.gekk@gmail.com> (by Wenchen Fan on 2025-02-18T20:55:23Z)
- ebc8df2: [SPARK-51246][SQL] Make InTypeCoercion produce resolved Casts

### What changes were proposed in this pull request?

Make `InTypeCoercion` produce resolved `Cast`s.

### Why are the changes needed?

This is important to avoid recursing down the tree in the single-pass Analyzer.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Existing tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49991 from vladimirg-db/vladimirg-db/make-in-coercion-produce-resolved-casts.

Authored-by: Vladimir Golubev <vladimir.golubev@databricks.com>
Signed-off-by: Max Gekk <max.gekk@gmail.com>
(cherry picked from commit 500bf78e77ca5cc8e414d3b8f40edb4ebfe2e10f)
Signed-off-by: Max Gekk <max.gekk@gmail.com> (by Vladimir Golubev on 2025-02-18T20:59:42Z)
- 0b627ae: [SPARK-48114][SQL] Move subquery validation out of CheckAnalysis

### What changes were proposed in this pull request?

Move subquery validation out of `CheckAnalysis`.

### Why are the changes needed?

To be reused in the single-pass Analyzer.

### Does this PR introduce _any_ user-facing change?

No, refactoring.

### How was this patch tested?

Existing tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49994 from vladimirg-db/vladimirg-db/move-subquery-validation-out-of-check-analysis.

Authored-by: Vladimir Golubev <vladimir.golubev@databricks.com>
Signed-off-by: Max Gekk <max.gekk@gmail.com>
(cherry picked from commit ead7d58ab0b664951f76f98db23ffb1409bf0e5f)
Signed-off-by: Max Gekk <max.gekk@gmail.com> (by Vladimir Golubev on 2025-02-18T21:49:48Z)
- 58029ac: [SPARK-51178][CONNECT][PYTHON] Raise proper PySpark error instead of `SparkConnectGrpcException`

### What changes were proposed in this pull request?

This PR propose to raise proper PySpark error instead of `SparkConnectGrpcException`.

This PR also introduces new PySpark error `PickleException` to cover the errors that represents an exception which is failed while pickling from server side

### Why are the changes needed?

To raise proper exception instead of `SparkConnectGrpcException`

### Does this PR introduce _any_ user-facing change?

No API changes, but the user-facing error improvement.

### How was this patch tested?

Updated the existing UT

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #49953 from itholic/SPARK-51178.

Authored-by: Haejoon Lee <haejoon.lee@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 4134e9f208bb53db72f0c7398473c6af63da3838)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Haejoon Lee on 2025-02-18T23:35:29Z)
- 1350986: [SPARK-51242][CONENCT][PYTHON] Improve Column performance when DQC is disabled

### What changes were proposed in this pull request?

This PR proposes to  improve Column performance when DQC(DataFrameQueryContext) is disabled by delaying to call `getActiveSession` which is pretty expensive.

### Why are the changes needed?

To improve the performance of Column operations.

### Does this PR introduce _any_ user-facing change?

No, API changes but only improves the performance

### How was this patch tested?

Manually tested, and also the existing CI should pass.

```python
>>> spark.conf.get("spark.python.sql.dataFrameDebugging.enabled")
'false'
```

**Before fix**
```python
>>> import time
>>> import pyspark.sql.functions as F
>>>
>>> c = F.col("name")
>>> start = time.time()
>>> for i in range(10000):
...   _ = c.alias("a")
...
>>> print(time.time() - start)
2.061354875564575
```

**After fix**
```python
>>> import time
>>> import pyspark.sql.functions as F
>>>
>>> c = F.col("name")
>>> start = time.time()
>>> for i in range(10000):
...   _ = c.alias("a")
...
>>> print(time.time() - start)
0.8050589561462402
```

And there is no difference when the flag is on:

```python
>>> spark.conf.get("spark.python.sql.dataFrameDebugging.enabled")
'true'
```

**Before fix**
```python
>>> import time
>>> import pyspark.sql.functions as F
>>>
>>> c = F.col("name")
>>> start = time.time()
>>> for i in range(10000):
...   _ = c.alias("a")
...
>>> print(time.time() - start)
3.755108118057251
```

**After fix**
```python
>>> import time
>>> import pyspark.sql.functions as F
>>>
>>> c = F.col("name")
>>> start = time.time()
>>> for i in range(10000):
...   _ = c.alias("a")
...
>>> print(time.time() - start)
3.6577670574188232
```

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49982 from itholic/DQC_improvement.

Authored-by: Haejoon Lee <haejoon.lee@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 489ba0d24975096c2953a6afbea7adb65b3ed4db)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Haejoon Lee on 2025-02-18T23:40:08Z)
- 2f59ff6: [SPARK-51176][PYTHON][CONNECT] Meet consistency for unexpected errors PySpark Connect <> Classic

### What changes were proposed in this pull request?

This PR proposes to add `UnknownException` for Spark Connect Python client to meet consistency for unexpected errors PySpark Connect <> Classic

### Why are the changes needed?

To meet consistency between PySpark Connect and Classic. Also, `UnknownErrors` might more clearer than `SparkConnectGrpcException` for unexpected errors to end users.

### Does this PR introduce _any_ user-facing change?

No API changes, but the user-facing error improvement

### How was this patch tested?

The existing CI should pass

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #49926 from itholic/unexpected_error.

Lead-authored-by: Haejoon Lee <haejoon.lee@databricks.com>
Co-authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit dc3fb50d587d8e0a984bc87b9f0b97b8583c5dd7)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Haejoon Lee on 2025-02-18T23:43:14Z)
- eeece9d: [MINOR][DOCS] Add missing backticks in `Upgrading from PySpark 3.5 to 4.0`

nit

### What changes were proposed in this pull request?

### Why are the changes needed?
Add missing backticks in `Upgrading from PySpark 3.5 to 4.0`

see https://apache.github.io/spark/api/python/migration_guide/pyspark_upgrade.html

### Does this PR introduce _any_ user-facing change?
to make the doc correctly rendered

### How was this patch tested?
ci

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #49989 from zhengruifeng/py_fix_doc_upgrade.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit aa12070c1321dfddb5876ef1494a65743fd93280)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Ruifeng Zheng on 2025-02-18T23:56:57Z)
- 6dc63ee: [SPARK-51239][INFRA] Upgrade Github Action image for `TPCDSQueryBenchmark` from 20.04 to latest

### What changes were proposed in this pull request?

This PR aims to upgrade Github Action image for `TPCDSQueryBenchmark` from 20.04 to latest and update the dependency of `databricks/tpcds-kit` to the latest codes.

In the past, there were compilation problems in high-version Ubuntu images due to g++ version compatibility issues, but this problem has been solved after this PR: https://github.com/databricks/tpcds-kit/pull/7

### Why are the changes needed?

Refer to: https://github.com/actions/runner-images/issues/11101

> The Ubuntu 20.04 Actions runner image will begin deprecation on 2025-02-01 and will be fully unsupported by 2025-04-01

![image](https://github.com/user-attachments/assets/db68ec55-f3ca-4a24-aa81-5347c85ec0ed)

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Manual check on Ubuntu 24.04 and Pass GA.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49980 from wayneguow/tpcds_inf.

Authored-by: Wei Guo <guow93@gmail.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 0af25b836549dcac530e490681d9090787e35956)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by Wei Guo on 2025-02-19T02:35:39Z)
- 860bd5e: Preparing Spark release v4.0.0-rc1 (by Wenchen Fan on 2025-02-19T04:30:25Z)
- b3e9d95: Preparing development version 4.0.1-SNAPSHOT (by Wenchen Fan on 2025-02-19T04:30:29Z)
- fa69793: [SPARK-51083][CORE] Modify JavaUtils to not swallow InterruptedExceptions

### What changes were proposed in this pull request?

These changes modify the `deleteRecursivelyUsingUnixNative` method in `JavaUtils.java` to not swallow `InterruptedException`s. The bulk of the changes in this PR relate to modifying the signatures of methods that directly or indirectly use `JavaUtils.deleteRecursivelyUsingUnixNative`.

### Why are the changes needed?

`JavaUtils.deleteRecursively` swallows `InterruptedException`s, and that can cause entire executor loss. Consider a streaming task running a streaming aggregation. It takes the following steps:

1. It [writes](https://github.com/apache/spark/blob/1fc9d7d92ec60cc21e8fd54562e702ea67cf01d3/sql/core/src/main/scala/org/apache/spark/sql/execution/streaming/statefulOperators.scala#L720) all data to the state store, and then [reads](https://github.com/apache/spark/blob/1fc9d7d92ec60cc21e8fd54562e702ea67cf01d3/sql/core/src/main/scala/org/apache/spark/sql/execution/streaming/statefulOperators.scala#L732) this data back to emit it (in, say, Complete mode).
2. With the RocksDB state store, it doesn't actually acquire any locks, perform any sleeping, etc. during (1). This means that if the query is cancelled and it is interrupted, it won't respond to the interrupt.
3. After (1) is done, it [calls commit](https://github.com/apache/spark/blob/1fc9d7d92ec60cc21e8fd54562e702ea67cf01d3/sql/core/src/main/scala/org/apache/spark/sql/execution/streaming/statefulOperators.scala#L744) on the state store.
4. In RocksDB, this turns into a call to `RocksDB::commit`, which can call [createSnapshot](https://github.com/apache/spark/blob/1fc9d7d92ec60cc21e8fd54562e702ea67cf01d3/sql/core/src/main/scala/org/apache/spark/sql/execution/streaming/state/RocksDB.scala#L879).
5. In createSnapshot, [we call Utils.deleteRecursively](https://github.com/apache/spark/blob/1fc9d7d92ec60cc21e8fd54562e702ea67cf01d3/sql/core/src/main/scala/org/apache/spark/sql/execution/streaming/state/RocksDB.scala#L879) to make sure that the temporary directory into which we place the RocksDB checkpoint is empty.
6. In deleteRecursively, we [call deleteRecursivelyUsingUnixNative](https://github.com/apache/spark/blob/1fc9d7d92ec60cc21e8fd54562e702ea67cf01d3/common/utils/src/main/java/org/apache/spark/network/util/JavaUtils.java#L115) which issues an `rm -rf` and then [calls process.waitFor](https://github.com/apache/spark/blob/1fc9d7d92ec60cc21e8fd54562e702ea67cf01d3/common/utils/src/main/java/org/apache/spark/network/util/JavaUtils.java#L183), which declares that it could throw an InterruptedException.
7. Unfortunately, deleteRecursivelyUsingUnixNative [indiscriminately catches all Exceptions](https://github.com/apache/spark/blob/1fc9d7d92ec60cc21e8fd54562e702ea67cf01d3/common/utils/src/main/java/org/apache/spark/network/util/JavaUtils.java#L184), which includes the `InterruptedException` potentially thrown by `process.waitFor`. Then, it rethrows an IOException.
8. That IOException is caught [here](https://github.com/apache/spark/blob/1fc9d7d92ec60cc21e8fd54562e702ea67cf01d3/common/utils/src/main/java/org/apache/spark/network/util/JavaUtils.java#L117), and a warning is logged. The interrupt has now been swallowed.

A streaming task thread that misses this interrupted exception will now not exit. If it doesn't exit for 60 seconds, then the TaskReaper will kill the JVM.

### Does this PR introduce _any_ user-facing change?

Yes.

### How was this patch tested?

This is fairly tricky to test; in fact, we don't exercise the code-path for `deleteRecursivelyUsingUnixNative` during testing on Apple Silicon, which made it hard for me.

My approach here was to modify `deleteRecursivelyUsingUnixNative` to explicitly sleep. Then, I called that method in a background thread, interrupting it from the test thread. If all went correctly, then the background thread _should_ have received an interrupt that it did not swallow, and the test thread could assert that that happened. You can see this test in [this commit](https://github.com/apache/spark/pull/49796/commits/95577db37c9209e64034db2e22879590ae636020), but since it's an intrusive change, I have reverted it. Example output is:

```
[info] UtilsSuite:
1. Starting thread
2. Waiting for it to get to its sleep
3. Going to spawn rm -rf
4. Finished deleting directory
5. Sleeping for 10 seconds
6. Interrupting thread that is sleeping
[info] - deleteRecursively throws InterruptedException (5 seconds, 18 milliseconds)
7. Catching and rethrowing interrupted exception
8. Thread exiting
9. gotInterruptedException = true
```

I validated that this test case I added _fails_ without my changes to fix the interrupt swallowing; you can check out that commit [here](https://github.com/apache/spark/pull/49796/commits/70f2a7b3e916a7a54b23901919159adc49ab8dda).

If you are a reviewer who can think of a way to create a test case we can check-in, please leave a review comment.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49796 from neilramaswamy/nr/spark-51083.

Authored-by: Neil Ramaswamy <neil.ramaswamy@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 2c628997a1cdc9ed6bdc6b49e5669e2fc85be870)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Neil Ramaswamy on 2025-02-19T05:43:08Z)
- ae17d89: [SPARK-51255][INFRA] Install dependencies related to docs in release image

### What changes were proposed in this pull request?

This PR partially reverts https://github.com/apache/spark/pull/49886 to recover dependencies related to documentation build in release image.

### Why are the changes needed?

To make the release build successful with documentation build

### Does this PR introduce _any_ user-facing change?

No, dev-only.

### How was this patch tested?

Manual test.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50001 from HyukjinKwon/SPARK-51255.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 53c326b3080c7dc29ad18680b997f6fe1cd320dd)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-19T06:56:38Z)
- db6c1d0: [SPARK-50655][SS] Move virtual col family related mapping into db layer instead of encoder

### What changes were proposed in this pull request?
Move virt col family related mapping into db layer instead of encoder

### Why are the changes needed?
Keep abstraction clear around ownership and also expose internal/non-internal key metrics correctly.
With this change, we have the following:
- encoder is only responsible for managing encoding based on type such as noPrefix, prefix, range etc
- the onus of maintaining virtual col families is now with the underlying DB layer
- this layer can now also expose metrics for internal as well as non-internal column families

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Existing Unit tests and added unit tests

```
[info] Run completed in 8 minutes, 48 seconds.
[info] Total number of tests run: 305
[info] Suites: completed 1, aborted 0
[info] Tests: succeeded 305, failed 0, canceled 0, ignored 0, pending 0
[info] All tests passed.
```

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #49304 from anishshri-db/task/SPARK-50655.

Authored-by: Anish Shrigondekar <anish.shrigondekar@databricks.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 5759882268dc145c41c3502d7d790c94d3fb451a)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Anish Shrigondekar on 2025-02-19T12:29:26Z)
- d0a7db4: [SPARK-51247][SQL] Move SubstituteExecuteImmediate to 'resolution' batch and prepare it for SQL Scripting local variables

### What changes were proposed in this pull request?
This PR changes `SubstituteExecuteImmediate`  to analyze it's entire subtree within a scoped context. This will allow us to disable SQL scripting local variables in the subtree, when they are added, which is necessary in order to sandbox the generated plan.

This PR also moves `SubstituteExecuteImmediate` to `resolution` batch in the analyzer. This is necessary in order to resolve arguments of EXECUTE IMMEDIATE properly, notably if the EXECUTE IMMEDIATE is the child of a `ParameterizedQuery`. This ensured proper resolution ordering i.e. first all parameters of EXECUTE IMMEDIATE will be resolved, and only then will the generated query itself be analyzed.

Local variables PR - https://github.com/apache/spark/pull/49445

### Why are the changes needed?
They are necessaty for local variables support in SQL scripting.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Existing unit tests and golden files.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49993 from dusantism-db/execute-immediate-resolution-batch.

Authored-by: Dušan Tišma <dusan.tisma@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 26febf763c1bc386a719c819c0bdfbee0abd948b)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dušan Tišma on 2025-02-19T12:57:49Z)
- aa3c1e2: [MINOR][PYTHON][DOCS] Refine the docstring of `VariantVal`

### What changes were proposed in this pull request?
Refine the docstring of `VariantVal`

### Why are the changes needed?
avoid the wildcard import, which is not suggested

### Does this PR introduce _any_ user-facing change?
doc-only change

### How was this patch tested?
doctest

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50002 from zhengruifeng/py_doc_variantval.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 948840b6effd7d1e81f21ba03c4afec1ea374602)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Ruifeng Zheng on 2025-02-20T00:49:10Z)
- b9c96c7: [SPARK-51254][PYTHON][CONNECT] Disallow --master with Spark Connect URL

### What changes were proposed in this pull request?

This PR proposes to disallow Spark Connect strings in `--master` when Spark API mode is `connect`. This is Python specific issue.

### Why are the changes needed?

Should work as documented in https://github.com/apache/spark/pull/49107

### Does this PR introduce _any_ user-facing change?

Not yet because the main change has not been released (https://github.com/apache/spark/pull/49107)

### How was this patch tested?

Manually tested:

```
 ./bin/pyspark --master "sc://localhost:15002" --conf spark.api.mode=connect
```
```
Python 3.11.9 (main, Apr 19 2024, 11:44:45) [Clang 14.0.6 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.
/.../spark/python/pyspark/shell.py:77: UserWarning: Failed to initialize Spark session.
  warnings.warn("Failed to initialize Spark session.")
Traceback (most recent call last):
  File "/.../spark/python/pyspark/shell.py", line 52, in <module>
    spark = SparkSession.builder.getOrCreate()
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/.../spark/python/pyspark/sql/session.py", line 512, in getOrCreate
    raise PySparkRuntimeError(
pyspark.errors.exceptions.base.PySparkRuntimeError: [MASTER_URL_INVALID] Master must either be yarn or start with spark, k8s, or local.
```

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50000 from HyukjinKwon/SPARK-51254.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 6603a4ef75eb94513b3ff4c98b2e243f38103fe2)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-20T02:32:15Z)
- 60e1d4a: [SPARK-51219][SQL][TESTS][FOLLOWUP] ShowTablesExec` remove `ArrayImplicits`

Related to https://github.com/apache/spark/pull/49144. scala 2.12 is failing with `ArrayImplicits`, which is in use for `ShowTablesExec.isTempView` method. This PR removes `org.apache.spark.util.ArrayImplicits._` from `ShowTablesExec` and uses default Seq instead.

To fix failing scala 2.12 compilation isssu.

No

Existing init tests and actions run.

No.

Closes #50008 from ostronaut/features/ShowTablesExec-remove-ArrayImplicits.

Authored-by: Dima <dimanowq@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 4d15f6465b7a163d04dcec7ec748c78e1217d0fb)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dima on 2025-02-20T03:03:37Z)
- e140dbb: [SPARK-48530][SQL] Support for local variables in SQL Scripting

### What changes were proposed in this pull request?
This pull request introduces support for local variables in SQL scripting.

#### Behavior:

Local variables are declared in the headers of compound bodies, and are bound to it's scope. Variables of the same name are allowed in nested scopes, where the innermost variable will be resolved. Optionally, a local variable can be qualified with the label of the compound body in which it was declared, which would allow accessing variables which are not the innermost in the current scope.

Local variables have resolution priority over session variables, session variable resolution is attempted after local variable resolution. The exception to this is with fully qualified session variables, in the format `system.session.<varName>` or `session.<varName>`. System and session are forbidden for use as compound body labels.

Local variables must not be qualified on declaration, can be set using `SET VAR` and cannot be `DROPPED`.

They also should not be allowed to be declared with `DECLARE OR REPLACE`, however this is not implemented on this PR as `FOR` statement relies on this behavior. `FOR` statement must be updated in a separate PR to use proper local variables, as the current implementation is simulating them using session variables.

#### Implementation notes:

As core depends on catalyst, it's impossible to import code from core(where most of SQL scripting implementation is located) to catalyst. To solve this a trait `VariableManager` is introduced, which is then implemented in core and injected to catalyst. This `VariableManager` is basically a wrapper around `SqlScriptingExecutionContext` and provides methods for getting/setting/creating variables.

This injection is tricky because we want to have one `ScriptingVariableManager` **per script**.
Options considered to achieve this are:
- Pass the manager/context to the analyzer using function calls. If possible, this solution would be ideal because it would allow every run of the analyzer to have it's own scripting context which is automatically cleaned up (AnalysisContext). This would also allow more control over the variable resolution, i.e. for `EXECUTE IMMEDIATE` we could simply not pass in the script context and it would behave as if outside of a script. This is the intended behavior for `EXECUTE IMMEDIATE`. The problem with this approach is it seems hard to implement. The call stack would be as follows: `Analyzer.executeAndCheck` -> `HybridAnalyzer.apply` -> `RuleExecutor.executeAndTrack` -> `Analyzer.execute` (**overridden** from RuleExecutor) -> `Analyzer.withNewAnalysisContext`. Implementing this context propagation would require changing the signatures of all of these methods, including superclass methods like `execute` and `executeAndTrack`.
- Store the context in `CatalogManager`. `CatalogManager's` lifetime is tied to the session, so to allow for multiple scripts to execute in the same time we would need to e.g. have a map `scriptUUID -> VariableManager`, and to have the `scriptUUID` as a `ThreadLocal` variable in the `CatalogManager`. The drawback of this approach is that the script has to clean up it's resources after execution, and also that it's more complicated to e.g. forbid `EXECUTE IMMEDIATE` from accessing local variables.

Currently the second option seems better to me, however I am open to suggestions on how to approach this.

EDIT: An option similar to the second one was chosen, except a ThreadLocal Singleton instance of context is used instead of storing it in `CatalogManager`.

EDIT: Execute Immediate needs to be reworked in order to work properly with local variables. The generated query should not be able to access local variables, which means EXECUTE IMMEDIATE needs to somehow sandbox that query. This is done by analyzing it's entire subtree in SubstituteExecuteImmediate, with context so we know we are in EXECUTE IMMEDIATE. PR for this refactor - https://github.com/apache/spark/pull/49993

### Why are the changes needed?
Currently, local variables are simulated using session variables in SQL scripting, which is a temporary solution and bad in many ways.

### Does this PR introduce _any_ user-facing change?
Yes, this change introduces multiple new types of errors.

### How was this patch tested?
Tests were added to SqlScriptingExecutionSuite and SqlScriptingParserSuite.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #49445 from dusantism-db/scripting-local-variables.

Authored-by: Dušan Tišma <dusan.tisma@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit fb17856a22be6968b2ed55ccbd7cf72111920bea)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dušan Tišma on 2025-02-20T13:22:16Z)
- 1ffeb5a: [SPARK-47208][DOCS][FOLLOWUP] Replace `spark.driver.minMemoryOverhead` with `spark.executor.minMemoryOverhead`

### What changes were proposed in this pull request?
Replace spark.driver.minMemoryOverhead with spark.executor.minMemoryOverhead

### Why are the changes needed?
docfix

### Does this PR introduce _any_ user-facing change?
no

### How was this patch tested?
doc build

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50018 from yaooqinn/SPARK-47208.

Authored-by: Kent Yao <yao@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit bbb9c2c1878e200d9012d2322d979ae794b1d41d)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Kent Yao on 2025-02-20T16:45:28Z)
- 55fc6f5: [SPARK-51097][SS] Adding state store instance metrics for last uploaded snapshot version in RocksDB

### What changes were proposed in this pull request?

SPARK-51097

This PR sets up instance-specific metrics (`SnapshotLastUploaded.partition_<partition id>_<state store name>` to be precise) in the executor side and publishes them through StreamingQueryProgress.

### Why are the changes needed?

There's currently a lack of observability into state store specific maintenance information, notably metrics of the last snapshot version uploaded. This affects the ability to identify performance degradation issues behind maintenance tasks and more as described in SPARK-51097.

### Does this PR introduce _any_ user-facing change?

There will be some new metrics displayed from StreamingQueryProgress:
```
Streaming query made progress: {
  ...
  "stateOperators" : [ {
    ...
    "customMetrics" : {
      ...
      "SnapshotLastUploaded.partition_0_default" : 2,
      "SnapshotLastUploaded.partition_12_default" : 10,
      "SnapshotLastUploaded.partition_8_default" : 10,
      ...
    }
  } ],
  "sources" : ...,
  "sink" : ...
}
```
Not all state store instance's metrics will be published to remove noise in query progress messages. The upper threshold is configured using `STATE_STORE_INSTANCE_METRICS_REPORT_LIMIT`, and will by default report 5 instance metrics.

### How was this patch tested?

Four new tests are added in RocksDBStateStoreIntegrationSuite.

The first two tests execute a dedup streaming query and verifies metrics are properly filtered + updated through the StreamingQueryProgress logs, but with different StateStore providers that skip maintenance tasks for specific partitions.

The other two tests execute a join streaming query, which contains four state stores per partition instead of one. These two tests verifies metrics are properly collected and filtered as well.

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #49816 from zecookiez/SPARK-51097.

Lead-authored-by: Zeyu Chen <zycm03@gmail.com>
Co-authored-by: Zeyu Chen <ZYCM03@gmail.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit da1854e0cb38681b950ff39a2cfb99d303e192c8)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Zeyu Chen on 2025-02-20T21:57:52Z)
- fb6e8ab: [SPARK-51092][SS] Skip the v1 FlatMapGroupsWithState tests with timeout on big endian platforms

### What changes were proposed in this pull request?
Skip the v1 FlatMapGroupsWithState tests with timeout on big endian platforms.

### Why are the changes needed?
The timestampTimeoutAttribute of StateManagerImplV1 is declared as IntegerType instead of LongType which breaks serialization on big endian platforms. This can't be fixed because it would be a breaking schema change so skip the tests instead.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Tested with existing tests on amd64 (little endian) and s390x (big endian)

Below is the test result from s390x:

```
- flatMapGroupsWithState - streaming with processing time timeout - state format version 1 !!! CANCELED !!!
  FlatMapGroupsWithStateSuite.this.isStateFormatSupported(FlatMapGroupsWithStateSuite.this.sqlConf.getConf[Int](org.apache.spark.sql.internal.SQLConf.FLATMAPGROUPSWITHSTATE_STATE_FORMAT_VERSION)) was false (FlatMapGroupsWithStateSuite.scala:471)
--
- flatMapGroupsWithState - streaming with processing time timeout - state format version 2
--
- flatMapGroupsWithState - streaming with processing time timeout - state format version 1 (RocksDBStateStore) !!! CANCELED !!!
  FlatMapGroupsWithStateSuite.this.isStateFormatSupported(FlatMapGroupsWithStateSuite.this.sqlConf.getConf[Int](org.apache.spark.sql.internal.SQLConf.FLATMAPGROUPSWITHSTATE_STATE_FORMAT_VERSION)) was false (FlatMapGroupsWithStateSuite.scala:471)
--
- flatMapGroupsWithState - streaming with processing time timeout - state format version 1 (RocksDBStateStore with changelog checkpointing) !!! CANCELED !!!
  FlatMapGroupsWithStateSuite.this.isStateFormatSupported(FlatMapGroupsWithStateSuite.this.sqlConf.getConf[Int](org.apache.spark.sql.internal.SQLConf.FLATMAPGROUPSWITHSTATE_STATE_FORMAT_VERSION)) was false (FlatMapGroupsWithStateSuite.scala:471)
--
- flatMapGroupsWithState - streaming with processing time timeout - state format version 2 (RocksDBStateStore)
--
- flatMapGroupsWithState - streaming with processing time timeout - state format version 2 (RocksDBStateStore with changelog checkpointing)
--
- flatMapGroupsWithState - streaming w/ event time timeout + watermark - state format version 1 !!! CANCELED !!!
  FlatMapGroupsWithStateSuite.this.isStateFormatSupported(FlatMapGroupsWithStateSuite.this.sqlConf.getConf[Int](org.apache.spark.sql.internal.SQLConf.FLATMAPGROUPSWITHSTATE_STATE_FORMAT_VERSION)) was false (FlatMapGroupsWithStateSuite.scala:539)
--
- flatMapGroupsWithState - streaming w/ event time timeout + watermark - state format version 2
--
- flatMapGroupsWithState - streaming w/ event time timeout + watermark - state format version 1 (RocksDBStateStore) !!! CANCELED !!!
  FlatMapGroupsWithStateSuite.this.isStateFormatSupported(FlatMapGroupsWithStateSuite.this.sqlConf.getConf[Int](org.apache.spark.sql.internal.SQLConf.FLATMAPGROUPSWITHSTATE_STATE_FORMAT_VERSION)) was false (FlatMapGroupsWithStateSuite.scala:539)
--
- flatMapGroupsWithState - streaming w/ event time timeout + watermark - state format version 1 (RocksDBStateStore with changelog checkpointing) !!! CANCELED !!!
  FlatMapGroupsWithStateSuite.this.isStateFormatSupported(FlatMapGroupsWithStateSuite.this.sqlConf.getConf[Int](org.apache.spark.sql.internal.SQLConf.FLATMAPGROUPSWITHSTATE_STATE_FORMAT_VERSION)) was false (FlatMapGroupsWithStateSuite.scala:539)
--
- flatMapGroupsWithState - streaming w/ event time timeout + watermark - state format version 2 (RocksDBStateStore)
--
- flatMapGroupsWithState - streaming w/ event time timeout + watermark - state format version 2 (RocksDBStateStore with changelog checkpointing)
--
- flatMapGroupsWithState, state ver 1 !!! CANCELED !!!
  java.nio.ByteOrder.nativeOrder().equals(java.nio.ByteOrder.LITTLE_ENDIAN) was false (StateDataSourceReadSuite.scala:802)
--
- flatMapGroupsWithState, state ver 2
--
- flatMapGroupsWithState, state ver 1 !!! CANCELED !!!
  java.nio.ByteOrder.nativeOrder().equals(java.nio.ByteOrder.LITTLE_ENDIAN) was false (StateDataSourceReadSuite.scala:802)
--
- flatMapGroupsWithState, state ver 2
--
- flatMapGroupsWithState, state ver 1 !!! CANCELED !!!
  java.nio.ByteOrder.nativeOrder().equals(java.nio.ByteOrder.LITTLE_ENDIAN) was false (StateDataSourceReadSuite.scala:802)
--
- flatMapGroupsWithState, state ver 2
```

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #49811 from jonathan-albrecht-ibm/master-endian-flatMapGroups.

Authored-by: Jonathan Albrecht <jonathan.albrecht@ibm.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit d6ca11e9353565c8c846b7573e5727a995732927)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Jonathan Albrecht on 2025-02-20T22:12:11Z)
- e6dbc9e: [SPARK-51249][SS] Fixing the NoPrefixKeyStateEncoder and Avro encoding to use the correct number of version bytes

### What changes were proposed in this pull request?

There are currently two bugs:
- The NoPrefixKeyStateEncoder adds an extra version byte to each row when UnsafeRow encoding is used: https://github.com/apache/spark/pull/47107
- Rows written with Avro encoding do not include a version byte: https://github.com/apache/spark/pull/48401

**Neither of these bugs have been released, since these bugs are only triggered with multiple column families, and transformWithState is only using it, which is going to be released for Spark 4.0.0.**

This change fixes both of these bugs.

### Why are the changes needed?

These changes are needed in order to conform with the expected state row encoding format.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Unit tests

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #49996 from ericm-db/SPARK-51249.

Lead-authored-by: Eric Marnadi <eric.marnadi@databricks.com>
Co-authored-by: Eric Marnadi <132308037+ericm-db@users.noreply.github.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 42ab97a3e6e77657ecc5cf6f1ff47805eb08422a)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Eric Marnadi on 2025-02-21T00:53:10Z)
- 4f19fa0: [SPARK-51222][SQL][FOLLOW-UP] Optimize ReplaceCurrentLike

### What changes were proposed in this pull request?
Minor follow up for https://github.com/apache/spark/pull/49963 to use lazy vals

### Why are the changes needed?
The original pr would have a small potential behavior change, if there are multiple current_xx() functions in the query, it could evaluate different results for each if the catalog is updated in the backend.  Making a lazy val allows the FinishAnalysis phase to resolve one value for each.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Existing unit test

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50028 from szehon-ho/SPARK-51222-follow.

Authored-by: Szehon Ho <szehon.apache@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit f37be893d01884461ac515c8b197fb30d9ba68ff)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Szehon Ho on 2025-02-21T01:34:05Z)
- 2a07595: [SPARK-51119][SQL][FOLLOW-UP] Add fallback to ResolveDefaultColumnsUtil existenceDefaultValues

### What changes were proposed in this pull request?
 The original change in https://github.com/apache/spark/pull/49840 was too optimistic and assumes that all column EXISTS_DEFAULT are already resolved and column folded.  However, if there is bad EXISTS_DEFAULT metadata (an unresolved expression is persisted) it will break.  Add fallback to use the original logic in that case.

### Why are the changes needed?
There are some cases where bad EXISTS_DEFAULT metadata is persisted by external catalogs, due to some bugs such as https://github.com/apache/spark/pull/49942 or other problems.

### Does this PR introduce _any_ user-facing change?
No, it should handle bad metadata better.

### How was this patch tested?
Add unit test

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #49962 from szehon-ho/SPARK-51119-follow-2.

Authored-by: Szehon Ho <szehon.apache@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 4ffc398d430783dc21fefbe918edb609aa4d9e3b)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Szehon Ho on 2025-02-21T03:24:24Z)
- 7128f1c: [SPARK-48516][PYTHON][FOLLOW-UP] Add a note in migration guide about Arrow-optimized Python UDF enabled by default

### What changes were proposed in this pull request?

This PR is a followup of https://github.com/apache/spark/pull/49482 that updates migration guide.

### Why are the changes needed?

In order for users to migrate to Spark 4.0 seamlessly

### Does this PR introduce _any_ user-facing change?

No, it fixes the migration guide documentation.

### How was this patch tested?

Manually checked.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50034 from HyukjinKwon/SPARK-48510-followup.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 45900c434c9ae275e9394a6fa0936a34a8bf3f3b)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-21T04:59:43Z)
- 913bf0e: [SPARK-51267][CONNECT] Match local Spark Connect server logic between Python and Scala

This PR proposes to match local Spark Connect server logic between Python and Scala. This PR includes:

1. Synchronize the local server and terminates it on `SparkSession.stop()`  in Scala
2. Remove the internal `SPARK_LOCAL_CONNECT` environment variable and `spark.local.connect` configurations, and handle them in `SparkSubmitCommandBuilder.buildSparkSubmitArgs`, and do not send `spark.remote` and `spark.api.mode` when locally running Spark Connect server.

To have the consistent behaviours between Python and Scala Spark Connect.

No.

Manually:

```
./bin/spark-shell --master "local" --conf spark.api.mode=connect
```

```
./bin/spark-shell --remote "local[*]"
```

```
./bin/spark-shell --master "local" --conf spark.api.mode=classic
```

```
git clone https://github.com/HyukjinKwon/spark-connect-example
cd spark-connect-example
build/sbt package
cd ..
git clone https://github.com/apache/spark.git
cd spark
build/sbt package
sbin/start-connect-server.sh
bin/spark-submit --name "testApp" --remote "sc://localhost" --class com.hyukjinkwon.SparkConnectExample ../spark-connect-example/target/scala-2.13/spark-connect-example_2.13-0.0.1.jar
```

```
./bin/pyspark --master "local" --conf spark.api.mode=connect
```

```
./bin/pyspark --remote "local"
```

```
./bin/pyspark --conf spark.api.mode=classic
```

```
./bin/pyspark --conf spark.api.mode=connect
```

There is also an existing unittest with Yarn.

No.

Closes #50017 from HyukjinKwon/fix-connect-repl.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 46e12a4bebfa090522a6ddafdef72d0b999a582f)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-21T07:29:59Z)
- 66d81aa: [SPARK-51284][SQL] Fix SQL Script execution for empty result

### What changes were proposed in this pull request?

This pull request proposes changes to fix the empty result returned from the SQL Script.
Change is quite simple, it just introduces the `resultSchema` var to track the schema of the last resulting statement in the SQL Script.
This way, the case when `result` is empty and there are no rows (and thus the schema cannot be fetched this way) is fixed, because the schema is now read from `DataFrame`.

### Why are the changes needed?

Fixing a bug - if the result statement in the SQL Script exists, but returns nothing, there were few problems:
- Tests were missing.
- Execution was failing.
- Schema would be missing.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Already existing tests.
Adapted the `SqlScriptingE2eSuite` to support output schema checks.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50024 from davidm-db/scripting_empty_result_fix.

Authored-by: David Milicevic <david.milicevic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit b70b90461681764db99ea3241bb46afbf8aca202)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by David Milicevic on 2025-02-21T12:20:15Z)
- 59287c0: [SPARK-51283][SQL][TESTS] Add test cases for LZ4 and SNAPPY for text

### What changes were proposed in this pull request?
This PR proposes to add test cases for `LZ4` and `SNAPPY` for text.

### Why are the changes needed?
Currently, Spark missing the test cases for `LZ4` and `SNAPPY`.

### Does this PR introduce _any_ user-facing change?
'No'.
Add test.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50043 from beliefer/SPARK-51283.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 140a69b4c21321107a6879ccd48aac6bfdaf280d)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by beliefer on 2025-02-21T16:10:10Z)
- 0676664: [SPARK-51263][CORE][SQL][TESTS] Clean up unnecessary `invokePrivate` method calls in test code

### What changes were proposed in this pull request?
This pr cleans up unnecessary calls to the `org.scalatest.PrivateMethodTester.Invoker#invokePrivate` method in the test code, replacing those cases with direct function calls.

### Why are the changes needed?
Due to changes in the function's access scope, some cases in the original tests that used `invokePrivate` to call private methods are no longer necessary.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
- Pass GitHub Actions

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50012 from LuciferYang/PrivateMethod-cleanup.

Lead-authored-by: yangjie01 <yangjie01@baidu.com>
Co-authored-by: YangJie <yangjie01@baidu.com>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit e1842c7f30231bbb697979acc6320e881154659a)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by yangjie01 on 2025-02-21T16:13:28Z)
- a24f3c3: [SPARK-51274][PYTHON] PySparkLogger should respect the expected keyword arguments

### What changes were proposed in this pull request?

`PySparkLogger` should respect the expected keyword arguments.

Also, `debug`, `warn`, `critical`, `fatal`, and `log` are added to have proper docs.

### Why are the changes needed?

Currently all of keyword arguments for `PySparkLogger` will be in the `context`, but it should respect the expected keyword arguments, like `exc_info`, `stack_info`, etc.

### Does this PR introduce _any_ user-facing change?

Yes, the logging methods for `PySparkLogger` will respect the expected arguments.

- before:

```py
>>> from pyspark.logger.logger import PySparkLogger
>>> logger = PySparkLogger.getLogger("TestLogger")
>>>
>>> logger.warning("This is an info log", exc_info=True, user="test_user_info", action="test_action_info")
{"ts": "2025-02-21 10:46:53,786", "level": "WARNING", "logger": "TestLogger", "msg": "This is an info log", "context": {"exc_info": true, "user": "test_user_info", "action": "test_action_info"}}
```

- after

```py
>>> logger.warning("This is an info log", exc_info=True, user="test_user_info", action="test_action_info")
{"ts": "2025-02-21 10:47:36,351", "level": "WARNING", "logger": "TestLogger", "msg": "This is an info log", "context": {"user": "test_user_info", "action": "test_action_info"}, "exception": {"class": "UnknownException", "msg": "None", "stacktrace": ["NoneType: None"]}}
```

### How was this patch tested?

Added the related tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50032 from ueshin/issues/SPARK-51274/logger.

Authored-by: Takuya Ueshin <ueshin@databricks.com>
Signed-off-by: Takuya Ueshin <ueshin@databricks.com>
(cherry picked from commit eb4a28b97398add36dd158f4cdc8725c344ed401)
Signed-off-by: Takuya Ueshin <ueshin@databricks.com> (by Takuya Ueshin on 2025-02-21T18:54:09Z)
- e4cfb64: [SPARK-51276][PYTHON] Enable spark.sql.execution.arrow.pyspark.enabled by default

### What changes were proposed in this pull request?

This PR proposes to enable `spark.sql.execution.arrow.pyspark.enabled` by default.

### Why are the changes needed?

So the end users can leverage the optimization by default.

### Does this PR introduce _any_ user-facing change?

It will fallback to non-optimized code path so it impact will be minimized. Users will leverage Arrow optimization by default.

### How was this patch tested?

Existing tests in the CI.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50036 from HyukjinKwon/enable-arrow-bydefault.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 9ac566dea89644b6054bf1362b9647e1dc67d3af)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-22T00:22:53Z)
- 87b2ed7: [SPARK-51279][CONNECT] Avoid constant sleep for waiting Spark Connect server in Scala

### What changes were proposed in this pull request?

This PR proposes to address https://github.com/apache/spark/pull/50017#discussion_r1963027036 by avoiding constant sleep but waiting until the log file is created by the local Spark Connect server.

### Why are the changes needed?

To make it robust.

### Does this PR introduce _any_ user-facing change?

Maybe they won't see retrying logs anymore.

### How was this patch tested?

Manually tested via `./bin/spark-shell --remote local`

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50039 from HyukjinKwon/avoid-sleep.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 666f45d9e5ef1e2999465c752182a4bd7b8d7151)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-22T00:23:52Z)
- 79ffa1d: [SPARK-51258][SQL] Remove unnecessary inheritance from SQLConfHelper

### What changes were proposed in this pull request?
This PR proposes to remove unnecessary inheritance from `SQLConfHelper`.

### Why are the changes needed?

1. Some code doesn't need `SQLConfHelper`, we can remove it.

2. `SparkPlanner` no need to extends `SQLConfHelper`, because it can get the `SQLConf` from `SparkSession` directly.

The other modification is related to the class Rule which already extends `SQLConfHelper`, so we should avoid the duplicated inheritance.
```
abstract class Rule[TreeType <: TreeNode[_]] extends SQLConfHelper with Logging {
...
}
```

### Does this PR introduce _any_ user-facing change?
'No'.
Just update the inner code.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50005 from beliefer/SPARK-51258.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit 30f4f4e56e73972a96664375f62ce7bbbba0c377)
Signed-off-by: beliefer <beliefer@163.com> (by beliefer on 2025-02-22T03:01:33Z)
- cd513f5: [SPARK-51156][CONNECT] Static token authentication support in Spark Connect

### What changes were proposed in this pull request?

Adds static token authentication support to Spark Connect, which is used by default for automatically started servers locally.

### Why are the changes needed?

To add authentication support to Spark Connect so a connect server isn't started that could be accessible to other users inadvertently.

### Does this PR introduce _any_ user-facing change?

The local authentication should be transparent to users, but adds the option for users manually starting connect servers to specify an authentication token.

### How was this patch tested?

Existing UTs

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50006 from Kimahriman/spark-connect-local-auth.

Lead-authored-by: Adam Binford <adamq43@gmail.com>
Co-authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 7e9547c6329334e26118e873afaf0b1173019169)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Adam Binford on 2025-02-23T01:25:59Z)
- cb2a9da: [SPARK-51258][SQL][FOLLOWUP] Remove unnecessary inheritance from SQLConfHelper

### What changes were proposed in this pull request?
This PR proposes to remove unnecessary inheritance from `SQLConfHelper`.

### Why are the changes needed?

1. There are some trait already extends `SQLConfHelper`, so we should avoid the duplicated inheritance.
```
trait TreeNodeResolver[UnresolvedNode <: TreeNode[_], ResolvedNode <: TreeNode[_]]
    extends SQLConfHelper
    with QueryErrorsBase {
  def resolve(unresolvedNode: UnresolvedNode): ResolvedNode
}
```
```
trait SQLHelper extends SQLConfHelper {
...
}
```
```
trait PlanTestBase extends PredicateHelper with SQLHelper { self: Suite =>
..
}
trait PlanTest extends SparkFunSuite with PlanTestBase
```
2. `V2SessionCatalog` already with `SQLConfHelper`, so we should use `conf` directly.

### Does this PR introduce _any_ user-facing change?
'No'.
Just update the inner code.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50046 from beliefer/SPARK-51258_followup.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit 9a1f921ae19d31278baae2f023306749e6b54daa)
Signed-off-by: beliefer <beliefer@163.com> (by beliefer on 2025-02-23T09:30:46Z)
- b2e0e76: [SPARK-51292][SQL] Remove unnecessary inheritance from PlanTestBase, ExpressionEvalHelper and PlanTest

### What changes were proposed in this pull request?
This PR proposes to remove unnecessary inheritance from `PlanTestBase`, `ExpressionEvalHelper` and `PlanTest`.

### Why are the changes needed?

1. Some class extends both `ExpressionEvalHelper` and `PlanTestBase`, but `ExpressionEvalHelper` already extends `PlanTestBase`.
```
trait ExpressionEvalHelper extends ScalaCheckDrivenPropertyChecks with PlanTestBase {
  self: SparkFunSuite =>
  ...
}
```
2. Class `NullDownPropagationSuite`, `OptimizeCsvExprsSuite`, `PushFoldableIntoBranchesSuite` doesn't need `ExpressionEvalHelper` at all.
3. Some class extends both `QueryTest` and `PlanTest`, but `QueryTest` already extends `PlanTest`.
```
abstract class QueryTest extends PlanTest {
...
}
```

### Does this PR introduce _any_ user-facing change?
'No'.
Just update the inner code.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50047 from beliefer/SPARK-51292.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit 30279686b63a4ea22f6664a63df1a2a957e737ef)
Signed-off-by: beliefer <beliefer@163.com> (by beliefer on 2025-02-23T09:44:29Z)
- 6866562: [SPARK-51294][SQL][CONNECT][TESTS] Improve the readability by split the variable of jars and configs for SparkConnectServerUtils

### What changes were proposed in this pull request?
This PR proposes to improve the readability by split the variable of jars and configs for `SparkConnectServerUtils`.

### Why are the changes needed?
Currently, according to the name and the description of variable `testConfigs`, it is for tests that needs some special configs. But it contains a parameter about test jar.
Reference the variable `connectJar`, we should extract the parameter of test jar to a single variable `catalystTestJar`.

### Does this PR introduce _any_ user-facing change?
'No'.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50050 from beliefer/SPARK-51294.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit b04e9c4918939d346f7c41898db56794aea9d349)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by beliefer on 2025-02-24T01:33:19Z)
- 4a64925: [SPARK-51297][DOCS] Fixed the scope of the query option in sql-data-sources-jdbc.md

### What changes were proposed in this pull request?
The documentation shows that the scope of jdbc's option is read/write, but after looking at the source code and testing it, it should actually only be read.
This error has persisted for multiple versions and is still not fixed.

source code:
https://github.com/apache/spark/blob/a661f9f305d96331338938e14b6ea0075f234aee/sql/core/src/main/scala/org/apache/spark/sql/execution/datasources/jdbc/JDBCOptions.scala#L287
code snippet:
![SnBKfLO4Fu](https://github.com/user-attachments/assets/93162fc6-fd3f-4c7a-8e36-413c50e3d8ff)
test snippet:
![WWWQRqH6jS](https://github.com/user-attachments/assets/07e3191e-406e-46aa-85a9-9c7902892db3)

### Why are the changes needed?
This avoids user confusion about the use of this option and avoids errors in its use

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
No testing required, just modifying the document

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50048 from llphxd/fix_jdbc_doc.

Lead-authored-by: huanxiaodong <huanxiaodong@dserspro.com>
Co-authored-by: huanxiaodong <llphxdgg@gmail.com>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit f1d78dc2df26acd0d71b7040c2767c2d6503dde9)
Signed-off-by: beliefer <beliefer@163.com> (by huanxiaodong on 2025-02-24T03:57:14Z)
- f6f30ca: [MINOR][DOCS] Clarify spark.remote and spark.master in pyspark-connect and pyspark-client at install.rst

### What changes were proposed in this pull request?

This PR fixes the installation page for PySpark to clarify spark.remote and spark.master in pyspark-connect and pyspark-client at install.rst

### Why are the changes needed?

To clarify spark.remote and spark.master in pyspark-connect and pyspark-client

### Does this PR introduce _any_ user-facing change?

No. doc-only change.

### How was this patch tested?

CI build in this PR

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50054 from HyukjinKwon/minor-doc-change1.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit c6097c7fbc8afd65b5f533805ba3596b2c096f53)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-24T04:44:23Z)
- 82db3ac: [SPARK-51300][PS][DOCS] Fix broken link for `ps.sql`

### What changes were proposed in this pull request?

This PR proposes to fix broken link for `ps.sql`

### Why are the changes needed?

There is broken link in official documentation for `ps.sql`

<img width="630" alt="Screenshot 2025-02-24 at 3 18 33 PM" src="https://github.com/user-attachments/assets/de70f1a9-35a2-4adb-80e4-d9726170344e" />

### Does this PR introduce _any_ user-facing change?

No API changes, but the user-facing documentation improvement.

### How was this patch tested?

Manually tested, and the existing doc build in CI should pass

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50056 from itholic/SPARK-51300.

Authored-by: Haejoon Lee <haejoon.lee@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 3515b207c41d78194d11933cd04bddc21f8418dd)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Haejoon Lee on 2025-02-24T07:58:46Z)
- b9d65ae: [SPARK-51278][PYTHON] Use appropriate structure of JSON format for `PySparkLogger`

### What changes were proposed in this pull request?

This PR proposes to use appropriate structure of JSON format for `PySparkLogger` by updating `JSONFormatter`.

### Why are the changes needed?

To align the log structure with JVM side. Currently the "stacktrace" does not align.

### Does this PR introduce _any_ user-facing change?

The output JSON structure will include "stacktrace" in correct format:

**Before**
```json
{
  "ts": "2025-02-21 15:40:52,043",
  "level": "ERROR",
  "logger": "TestLogger",
  "msg": "Exception occurred",
  "context": {"user": "test_user_stacktrace"},
  "exception": {
    "class": "ValueError",
    "msg": "Test Exception",
    "stacktrace": [
      "Traceback (most recent call last):", "  File \"/spark/python/pyspark/logger/tests/test_logger.py\", line 115, in test_log_exception_with_stacktrace", "    raise ValueError(\"Test Exception\")", "ValueError: Test Exception"
    ]
  }
}
```

**After**
```json
{
  "ts": "2025-02-21 15:40:52,043",
  "level": "ERROR",
  "logger": "TestLogger",
  "msg": "Exception occurred",
  "context": {"user": "test_user_stacktrace"},
  "exception": {
    "class": "ValueError",
    "msg": "Test Exception",
    "stacktrace": [
      {
        "class": null,
        "method": "test_log_exception_with_stacktrace",
        "file": "/spark/python/pyspark/logger/tests/test_logger.py",
        "line": "115"
      }
    ]
  }
}
```

### How was this patch tested?

Added related UT

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50038 from itholic/fix_json_format.

Lead-authored-by: Haejoon Lee <haejoon.lee@databricks.com>
Co-authored-by: Hyukjin Kwon <gurwls223@gmail.com>
Signed-off-by: Haejoon Lee <haejoon.lee@databricks.com>
(cherry picked from commit 67a337e202afcd4f32a0fd593488fbad21751f76)
Signed-off-by: Haejoon Lee <haejoon.lee@databricks.com> (by Haejoon Lee on 2025-02-24T09:57:48Z)
- c2d1fc9: [SPARK-50098][PYTHON][FOLLOW-UP] Update _minimum_googleapis_common_protos_version in setup.py for pyspark-client

### What changes were proposed in this pull request?

This PR is a followup of https://github.com/apache/spark/pull/48643 that updates _minimum_googleapis_common_protos_version in setup.py for pyspark-client

### Why are the changes needed?

To match the version with pyspark.

### Does this PR introduce _any_ user-facing change?

No, `pyspark-client` has not been released yet.

### How was this patch tested?

It will be tested in "Debug Build / Spark Connect Python-only (master, Python 3.11) " build.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50063 from HyukjinKwon/SPARK-50098-followup.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit a084d64dbedb895ba451b462f42469a0744c5e9f)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-24T11:17:53Z)
- f615462: [SPARK-50015][PYTHON][FOLLOW-UP] Update _minimum_grpc_version in setup.py for pyspark-client

### What changes were proposed in this pull request?

This PR is a followup of https://github.com/apache/spark/pull/48524 that updates _minimum_grpc_version in setup.py for pyspark-client

### Why are the changes needed?

To match the version with pyspark.

### Does this PR introduce _any_ user-facing change?

No, `pyspark-client` has not been released yet.

### How was this patch tested?

It will be tested in "Debug Build / Spark Connect Python-only (master, Python 3.11) " build.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50064 from HyukjinKwon/SPARK-50015-followup2.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit ee8e10f077cd5a0b054233e389731a0c9fb3df1e)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-24T11:18:50Z)
- 5da203e: [SPARK-51304][DOCS][PYTHON] Use `getCondition` instead of `getErrorClass` in contribution guide

### What changes were proposed in this pull request?

This PR proposes to use `getCondition` instead of `getErrorClass` in contribution guide

### Why are the changes needed?

We deprecated `getErrorClass`

### Does this PR introduce _any_ user-facing change?

No API changes, but the user-facing doc will be updated

### How was this patch tested?

The existing doc build CI

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50062 from itholic/get_condition_doc.

Authored-by: Haejoon Lee <haejoon.lee@databricks.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 968542f21a0670be3c17252254ac86eb8bf898fd)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by Haejoon Lee on 2025-02-24T13:24:45Z)
- 7bbad35: [SPARK-51078][SPARK-50963][ML][PYTHON][CONNECT][TESTS][FOLLOW-UP] Add back tests for default value

### What changes were proposed in this pull request?
add back tests deleted in https://github.com/apache/spark/commit/e0a7db2d2a7d295f933f9fc2d5605c5e59c58aa7#diff-50e109673576cc6d4f8727f54076b0884b93b759c49d98c908581db7093cb5ab

### Why are the changes needed?
for coverage, `StopWordRemover`'s default value implementation is special

### Does this PR introduce _any_ user-facing change?
no

### How was this patch tested?
ci

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50067 from zhengruifeng/ml_connect_test_swr.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org>
(cherry picked from commit 7e5bf7262d76f3e026b5a5a63395c597a8f7e0be)
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by Ruifeng Zheng on 2025-02-24T13:28:43Z)
- 4320530: [SPARK-49912] Refactor simple CASE statement to evaluate the case variable only once

### What changes were proposed in this pull request?
In this PR, CASE statement is refactored. Existing `CaseStatement` is split into two - `SimpleCaseStatement` and `SearchedCaseStatement`. `SearchedCaseStatement` retains the old behavior, while for `SimpleCaseStatement` a new logical and execution node are added - `SimpleCaseStatement` and `SimpleCaseStatementExec`.

Previously, a simple case statement would evaluate the case variable again for every WHEN clause in the CASE. This is both inefficient, and could produce unexpected behavior if the evaluation has a side effect. `SimpleCaseStatementExec` now caches the result of the evaluation, and compares the WHEN conditions to the cached `Literal`.

### Why are the changes needed?
Previous iteration of simple CASE evaluated the expression multiple times.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Tests were added to `SqlScriptingParserSuite`, `SqlScriptingInterpreterSuite` and `SqlScriptingExecutionNodeSuite`.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50027 from dusantism-db/scripting-case-improvements-v2.

Authored-by: Dušan Tišma <dusan.tisma@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 48fc0fba41cb71a0cd8859c86f00b15557c2e655)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dušan Tišma on 2025-02-24T14:52:38Z)
- 87034e8: [SPARK-51156][CONNECT][FOLLOWUP] Remove unused `private val AUTH_TOKEN_ON_INSECURE_CONN_ERROR_MSG` from `SparkConnectClient`

### What changes were proposed in this pull request?
This pr aims to remove unused `private val AUTH_TOKEN_ON_INSECURE_CONN_ERROR_MSG` from `SparkConnectClient`  because it becomes a useless `private val` declaration after https://github.com/apache/spark/pull/50006.

### Why are the changes needed?
Remove unused `private val`.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Pass GitHub Actions

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50070 from LuciferYang/SPARK-51156-FOLLOWUP.

Authored-by: yangjie01 <yangjie01@baidu.com>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 9de3b7c677f1cec4f13ba75a170b70d6aa90b306)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by yangjie01 on 2025-02-24T17:10:58Z)
- 661edbe: [SPARK-51305][SQL][CONNECT] Improve `SparkConnectPlanExecution.createObservedMetricsResponse`

### What changes were proposed in this pull request?
This PR proposes to improve the code for `createObservedMetricsResponse`.

### Why are the changes needed?
There exists a duplicate judgement in loop, we should eliminate it.

### Does this PR introduce _any_ user-facing change?
'No'.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50066 from beliefer/SPARK-51305.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 9f637b5ca0f63d158b329ee3330f988362f50d05)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by beliefer on 2025-02-24T17:19:26Z)
- a520f12: [SPARK-50692][SQL] Add the LPAD and RPAD pushdown support for H2

### What changes were proposed in this pull request?
This PR proposes to add the `LPAD` and `RPAD` pushdown support for H2.

### Why are the changes needed?
https://github.com/apache/spark/pull/49325 added the support for `RPAD` pushdown.
H2 as a built-in JDBC dialect for the test purpose, should add the `LPAD` and `RPAD` pushdown support for H2.

### Does this PR introduce _any_ user-facing change?
'Yes'.
Spark will supports pushdown for `LPAD` and `RPAD` for H2.

### How was this patch tested?
GA>

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50068 from beliefer/SPARK-50692.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit ea15a953e818eec9f1d1c4b24a2fc376c27dba6b)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by beliefer on 2025-02-24T17:32:20Z)
- 71ff099: [SPARK-51099][PYTHON][FOLLOWUP][4.0] Avoid logging when selector.select returns 0 without waiting the configured timeout

### What changes were proposed in this pull request?

This is a backport of #50071.

Avoids logging when `selector.select` returns `0` without waiting the configured timeout.

### Why are the changes needed?

There is a case of spurious wakeup while waiting the selector.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

The existing tests should pass.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50072 from ueshin/issues/SPARK-51099/4.0/spurious_wakeup.

Authored-by: Takuya Ueshin <ueshin@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Takuya Ueshin on 2025-02-24T23:59:36Z)
- ff0bdc6: [SPARK-50914][PYTHON][CONNECT] Match GRPC dependencies for Python-only master scheduled job

### What changes were proposed in this pull request?

This PR matches the GRPC dependencies for "Build / Spark Connect Python-only (master, Python 3.11)" build: https://github.com/apache/spark/blob/d4b4cfc79491fb8a39ccb0b3d0ca2e1d1c8b7a70/dev/infra/Dockerfile#L99

### Why are the changes needed?

To fix the broken build up https://github.com/apache/spark/actions/workflows/build_python_connect.yml

### Does this PR introduce _any_ user-facing change?

No, test-only.

### How was this patch tested?

Tested in https://github.com/HyukjinKwon/spark/actions/runs/13496429113

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50058 from HyukjinKwon/debug-python-job.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 529e887b794e67385ef98fa43be6fe000776db99)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-25T00:21:53Z)
- 2f35512: [SPARK-51306][TESTS] Fix test errors caused by improper DROP TABLE/VIEW in describe.sql

### What changes were proposed in this pull request?

This PR fixes test errors caused by improper DROP TABLE/VIEW in describe.sql

- Table Not Found Error when dropping views after dropping the base table
- Table Already Exists Error w/o proper drop

### Why are the changes needed?
test fix

### Does this PR introduce _any_ user-facing change?
no

### How was this patch tested?

the existing tests

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50061 from yaooqinn/minor.

Authored-by: Kent Yao <yao@apache.org>
Signed-off-by: Kent Yao <yao@apache.org>
(cherry picked from commit 352d1ed84db24f8d390d82c85685b507484dd503)
Signed-off-by: Kent Yao <yao@apache.org> (by Kent Yao on 2025-02-25T01:59:36Z)
- 29b9b4a: [SPARK-50795][SQL][FOLLOWUP] Set isParsing to false for the timestamp formatter in DESCRIBE AS JSON

### What changes were proposed in this pull request?

This PR set isParsing to false for the timestamp formatter in DESCRIBE AS JSON, because the formatter is not used for parsing datetime strings

### Why are the changes needed?

Although it does not affect the final output due to the current fmt we use now being w/o 'S' portion, it can prevent potential bugs if we store/display higher-precision timestamps.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?

Existing tests

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50065 from yaooqinn/SPARK-50795.

Authored-by: Kent Yao <yao@apache.org>
Signed-off-by: Kent Yao <yao@apache.org>
(cherry picked from commit 7feb911c814b3b0e285bd2b146085668e964f014)
Signed-off-by: Kent Yao <yao@apache.org> (by Kent Yao on 2025-02-25T02:03:41Z)
- ae5aa28: [SPARK-50785][SQL] Refactor FOR statement to utilize local variables properly

### What changes were proposed in this pull request?
This PR refactors FOR statement to use local variables instead of session variables to represent columns. Previously, FOR simulated local variables by artificially creating and dropping session variables, which caused a number of issues. In this PR, we create an internal `CompoundBodyExec` to represent the "scope" of the FOR statement. Within this body we declare local variables, which are automatically cleaned up when we exit the scope. We set the label of this body to the FOR variable name, if present, which enables easy access to the columns by qualifying with the FOR variable name.

### Why are the changes needed?
Previous version had a number of issues, e.g. nested for loops with same column names would fail.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
`SqlScriptingInterpreterSuite` and `SqlScriptingExecutionNodeSuite` were updated.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50026 from dusantism-db/scripting-for-improvements-v2.

Authored-by: Dušan Tišma <dusan.tisma@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 0184c5bf6670e5bde0f79b2ce64319fce813704f)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dušan Tišma on 2025-02-25T14:10:38Z)
- df98b0e: [SPARK-51311][BUILD] Promote bcprov-jdk18on to compile scope

### What changes were proposed in this pull request?

Promote `org.bouncycastle:bcprov-jdk18on` to `compile` scope (actually `hadoop.deps.scope`).

### Why are the changes needed?

HDFS-15098 (3.4.0) adds hard dependency on `bcprov-jdk18on`, Spark fails to submit to Kerberized cluster without this dependency, until HADOOP-19152 (3.5.0, unreleased)
```
Exception in thread "main" java.lang.NoClassDefFoundError: org/bouncycastle/jce/provider/BouncyCastleProvider
	at org.apache.hadoop.crypto.key.kms.KMSClientProvider$KMSTokenRenewer.handleKind(KMSClientProvider.java:181)
	at org.apache.hadoop.security.token.Token.getRenewer(Token.java:467)
	at org.apache.hadoop.security.token.Token.renew(Token.java:500)
	at org.apache.spark.deploy.security.HadoopFSDelegationTokenProvider.$anonfun$getTokenRenewalInterval$3(HadoopFSDelegationTokenProvider.scala:147)
	at scala.runtime.java8.JFunction0$mcJ$sp.apply(JFunction0$mcJ$sp.scala:17)
	at scala.util.Try$.apply(Try.scala:217)
	at org.apache.spark.deploy.security.HadoopFSDelegationTokenProvider.$anonfun$getTokenRenewalInterval$2(HadoopFSDelegationTokenProvider.scala:146)
	at scala.collection.StrictOptimizedIterableOps.flatMap(StrictOptimizedIterableOps.scala:118)
	at scala.collection.StrictOptimizedIterableOps.flatMap$(StrictOptimizedIterableOps.scala:105)
	at scala.collection.mutable.ArrayBuffer.flatMap(ArrayBuffer.scala:42)
	at org.apache.spark.deploy.security.HadoopFSDelegationTokenProvider.getTokenRenewalInterval(HadoopFSDelegationTokenProvider.scala:145)
	at org.apache.spark.deploy.security.HadoopFSDelegationTokenProvider.obtainDelegationTokens(HadoopFSDelegationTokenProvider.scala:62)
	at org.apache.spark.deploy.security.HadoopDelegationTokenManager.$anonfun$obtainDelegationTokens$2(HadoopDelegationTokenManager.scala:169)
	at scala.collection.Iterator$$anon$10.nextCur(Iterator.scala:594)
	at scala.collection.Iterator$$anon$10.hasNext(Iterator.scala:608)
	at scala.collection.immutable.List.prependedAll(List.scala:152)
	at scala.collection.immutable.List$.from(List.scala:685)
	at scala.collection.immutable.List$.from(List.scala:682)
	at scala.collection.IterableFactory$Delegate.from(Factory.scala:288)
	at scala.collection.immutable.Iterable$.from(Iterable.scala:35)
	at scala.collection.immutable.Iterable$.from(Iterable.scala:32)
	at scala.collection.IterableFactory$Delegate.from(Factory.scala:288)
	at scala.collection.IterableOps.flatMap(Iterable.scala:686)
	at scala.collection.IterableOps.flatMap$(Iterable.scala:686)
	at scala.collection.AbstractIterable.flatMap(Iterable.scala:935)
	at org.apache.spark.deploy.security.HadoopDelegationTokenManager.org$apache$spark$deploy$security$HadoopDelegationTokenManager$$obtainDelegationTokens(HadoopDelegationTokenManager.scala:167)
	at org.apache.spark.deploy.security.HadoopDelegationTokenManager$$anon$2.run(HadoopDelegationTokenManager.scala:150)
	at org.apache.spark.deploy.security.HadoopDelegationTokenManager$$anon$2.run(HadoopDelegationTokenManager.scala:148)
	at java.base/java.security.AccessController.doPrivileged(AccessController.java:712)
	at java.base/javax.security.auth.Subject.doAs(Subject.java:439)
	at org.apache.hadoop.security.UserGroupInformation.doAs(UserGroupInformation.java:1953)
	at org.apache.spark.deploy.security.HadoopDelegationTokenManager.obtainDelegationTokens(HadoopDelegationTokenManager.scala:148)
	at org.apache.spark.scheduler.cluster.CoarseGrainedSchedulerBackend.$anonfun$start$1(CoarseGrainedSchedulerBackend.scala:632)
	at org.apache.spark.scheduler.cluster.CoarseGrainedSchedulerBackend.$anonfun$start$1$adapted(CoarseGrainedSchedulerBackend.scala:626)
	at scala.Option.foreach(Option.scala:437)
	at org.apache.spark.scheduler.cluster.CoarseGrainedSchedulerBackend.start(CoarseGrainedSchedulerBackend.scala:626)
	at org.apache.spark.scheduler.cluster.YarnClientSchedulerBackend.start(YarnClientSchedulerBackend.scala:49)
	at org.apache.spark.scheduler.TaskSchedulerImpl.start(TaskSchedulerImpl.scala:237)
	at org.apache.spark.SparkContext.<init>(SparkContext.scala:622)
	at org.apache.spark.SparkContext$.getOrCreate(SparkContext.scala:3059)
	at org.apache.spark.sql.classic.SparkSession$Builder.$anonfun$build$2(SparkSession.scala:906)
	at scala.Option.getOrElse(Option.scala:201)
	at org.apache.spark.sql.classic.SparkSession$Builder.build(SparkSession.scala:897)
	at org.apache.spark.sql.classic.SparkSession$Builder.getOrCreate(SparkSession.scala:926)
	at org.apache.spark.sql.classic.SparkSession$Builder.getOrCreate(SparkSession.scala:799)
	at org.apache.spark.sql.SparkSession$Builder.getOrCreate(SparkSession.scala:923)
	at org.apache.spark.sql.hive.thriftserver.SparkSQLEnv$.init(SparkSQLEnv.scala:64)
	at org.apache.spark.sql.hive.thriftserver.SparkSQLCLIDriver.<init>(SparkSQLCLIDriver.scala:405)
	at org.apache.spark.sql.hive.thriftserver.SparkSQLCLIDriver$.main(SparkSQLCLIDriver.scala:162)
	at org.apache.spark.sql.hive.thriftserver.SparkSQLCLIDriver.main(SparkSQLCLIDriver.scala)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:569)
	at org.apache.spark.deploy.JavaMainApplication.start(SparkApplication.scala:52)
	at org.apache.spark.deploy.SparkSubmit.org$apache$spark$deploy$SparkSubmit$$runMain(SparkSubmit.scala:1032)
	at org.apache.spark.deploy.SparkSubmit.doRunMain$1(SparkSubmit.scala:204)
	at org.apache.spark.deploy.SparkSubmit.submit(SparkSubmit.scala:227)
	at org.apache.spark.deploy.SparkSubmit.doSubmit(SparkSubmit.scala:96)
	at org.apache.spark.deploy.SparkSubmit$$anon$2.doSubmit(SparkSubmit.scala:1137)
	at org.apache.spark.deploy.SparkSubmit$.main(SparkSubmit.scala:1146)
	at org.apache.spark.deploy.SparkSubmit.main(SparkSubmit.scala)
Caused by: java.lang.ClassNotFoundException: org.bouncycastle.jce.provider.BouncyCastleProvider
	at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:641)
	at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:188)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:525)
	... 62 more
```

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Manually tested on a Kerberized cluster.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50077 from pan3793/SPARK-51311.

Authored-by: Cheng Pan <chengpan@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 4f5ee806597c76e2beea401006fb5a276d7227b1)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Cheng Pan on 2025-02-25T23:40:49Z)
- 900dea8: [SPARK-51317][PYTHON] Require pandas as well for Arrow-optimized Python UDF

### What changes were proposed in this pull request?

This PR proposes to require pandas as well for Arrow-optimized Python UDF

### Why are the changes needed?

Now it fails as below:

```
Driver stacktrace:)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/.../spark/python/pyspark/sql/classic/dataframe.py", line 285, in show
    print(self._show_string(n, truncate, vertical))
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/.../spark/python/pyspark/sql/classic/dataframe.py", line 303, in _show_string
    return self._jdf.showString(n, 20, vertical)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/.../spark/python/lib/py4j-0.10.9.9-src.zip/py4j/java_gateway.py", line 1362, in __call__
  File "/.../spark/python/pyspark/errors/exceptions/captured.py", line 258, in deco
    raise converted from None
pyspark.errors.exceptions.captured.PythonException:
  An exception was thrown from the Python worker. Please see the stack trace below.
Traceback (most recent call last):
  File "/.../spark/python/lib/pyspark.zip/pyspark/worker.py", line 2012, in main
    func, profiler, deserializer, serializer = read_udfs(pickleSer, infile, eval_type)
                                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/.../spark/python/lib/pyspark.zip/pyspark/worker.py", line 1922, in read_udfs
    read_single_udf(
  File "/.../spark/python/lib/pyspark.zip/pyspark/worker.py", line 897, in read_single_udf
    return wrap_arrow_batch_udf(func, args_offsets, kwargs_offsets, return_type, runner_conf)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/.../spark/python/lib/pyspark.zip/pyspark/worker.py", line 192, in wrap_arrow_batch_udf
    def evaluate(*args: pd.Series) -> pd.Series:
                        ^^^^^^^^^
AttributeError: module 'pandas' has no attribute 'Series'
```

We should require it.

### Does this PR introduce _any_ user-facing change?

Yes, it requires pandas now explicitly.

### How was this patch tested?

Manually tested.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50083 from HyukjinKwon/check-pandas-aswell.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 8e8eccbf5118cac62bbb4d559d0026cad7191cfa)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-26T04:53:28Z)
- 624459f: [SPARK-51313][PYTHON] Fix timestamp format for PySparkLogger

### What changes were proposed in this pull request?

Fixes timestamp format for `PySparkLogger`.

### Why are the changes needed?

Currently the timestamp format in JSON string from `PySparkLogger` can't be read by Spark with the given schema, which results in the timestamps become `NULL`.

### Does this PR introduce _any_ user-facing change?

Yes, the JSON string written by `PySparkLogger` can be read by Spark with the given schema.

For example:

```py
>>> import logging
>>> from pyspark.logger import PySparkLogger, SPARK_LOG_SCHEMA
>>>
>>> logger = PySparkLogger.getLogger("TestLogger")
>>> logfile = 'test_log'
>>> handler = logging.FileHandler(logfile)
>>> logger.addHandler(handler)
>>> logger.setLevel(logging.INFO)
>>>
>>> logger.info("Test logging structure.")
```

- before

```py
>>> spark.read.format("json").schema(SPARK_LOG_SCHEMA).load(logfile).show(truncate=False)
+----+-----+-----------------------+-------+---------+----------+
|ts  |level|msg                    |context|exception|logger    |
+----+-----+-----------------------+-------+---------+----------+
|NULL|INFO |Test logging structure.|{}     |NULL     |TestLogger|
+----+-----+-----------------------+-------+---------+----------+
```

- after

```py
>>> spark.read.format("json").schema(SPARK_LOG_SCHEMA).load(logfile).show(truncate=False)
+-----------------------+-----+-----------------------+-------+---------+----------+
|ts                     |level|msg                    |context|exception|logger    |
+-----------------------+-----+-----------------------+-------+---------+----------+
|2025-02-25 16:13:18.306|INFO |Test logging structure.|{}     |NULL     |TestLogger|
+-----------------------+-----+-----------------------+-------+---------+----------+
```

### How was this patch tested?

Added the related tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50081 from ueshin/issues/SPARK-51313/ts_format.

Authored-by: Takuya Ueshin <ueshin@databricks.com>
Signed-off-by: Takuya Ueshin <ueshin@databricks.com>
(cherry picked from commit 85f05e38b70325b405cf594ba24c6239b0b537e3)
Signed-off-by: Takuya Ueshin <ueshin@databricks.com> (by Takuya Ueshin on 2025-02-26T05:09:26Z)
- 15ca40a: [SPARK-51221][CONNECT][TESTS] Use unresolvable host name in SparkConnectClientSuite

### What changes were proposed in this pull request?
The PR changes unresolvable host name from 'ABC' to 'host.invalid' in SparkConnectClientSuite.

### Why are the changes needed?
The change provides more reliable way to test DNS unresolvable host names

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
PR affects the test suite only.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #49960 from vrozov/SPARK-51221.

Authored-by: Vlad Rozov <vrozov@amazon.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 14c13788b5871ad1454237ae0d90a799f9fb6be6)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Vlad Rozov on 2025-02-26T05:57:00Z)
- 136a6f1: [SPARK-51312][SQL] Fix createDataFrame from RDD[Row]

### What changes were proposed in this pull request?
Making createDataFrame use lenient Encoder for serialization.

### Why are the changes needed?
Passing Rows is something defined by users, so if we do not allow this, we would fail queries like this.
```
val schema = new org.apache.spark.sql.types.StructType().add("a", "date")
val rdd = spark.sparkContext.parallelize(
org.apache.spark.sql.Row(java.time.LocalDate.of(2020, 5, 13)) :: Nil)
spark.createDataFrame(rdd, schema).collect()
```

### Does this PR introduce _any_ user-facing change?
Yes.
The change is that we fix failing queries when we try to read Date/LocalDate independent of java8API config value.

### How was this patch tested?
Added appropriate tests.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50079 from mihailom-db/fixCreateDataFrame.

Authored-by: Mihailo Milosevic <mihailo.milosevic@databricks.com>
Signed-off-by: Max Gekk <max.gekk@gmail.com>
(cherry picked from commit 381d5bc65e4d1f49cb89b8736f9d1c8437345fbb)
Signed-off-by: Max Gekk <max.gekk@gmail.com> (by Mihailo Milosevic on 2025-02-26T10:00:34Z)
- ed955d6: [SPARK-51265][SQL] IncrementalExecution should set the command execution code correctly

### What changes were proposed in this pull request?

In `QueryExecution#explainString`, we turn this batch `QueryExecution` to the streaming version `IncrementalExecution`, however, we missed setting the command execution mode correctly which caused stack overflow. This PR fixes it.

### Why are the changes needed?

improve error message

### Does this PR introduce _any_ user-facing change?

no

### How was this patch tested?

new tests

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #50037 from cloud-fan/stream.

Authored-by: Wenchen Fan <wenchen@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 7d7a05b7fb1c72263409e845314dbc361a828a0a)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Wenchen Fan on 2025-02-26T10:39:21Z)
- f799470: [SPARK-51315][SQL] Enabling object level collations by default

### What changes were proposed in this pull request?

Enabling the flag for object level collations by default, as the feature is now working end-to-end.
Also, a minor fix is made in DDL command resolution for AlterTableCommand, ensuring that the altered object is an instance of ResolvedTable, to avoid exposing this path for other types such as ResolvedPersistentView. This is just additional safety mechanism.

### Why are the changes needed?

The feature is now working end-to-end, and can be enabled accordingly.

### Does this PR introduce _any_ user-facing change?

No. Previous PRs related to this functionality already introduced all underlying user facing changes.

### How was this patch tested?

Existing dedicated tests already cover this functionality (the flag was already enabled in testing environment).

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50082 from dejankrak-db/enable-object-level-collations.

Lead-authored-by: Dejan Krakovic <dejan.krakovic@databricks.com>
Co-authored-by: Wenchen Fan <cloud0fan@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit ff7b4a423e6d765245627388577d947317a6fff3)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dejan Krakovic on 2025-02-26T13:56:51Z)
- a9ad26e: [SPARK-51277][PYTHON] Implement 0-arg implementation in Arrow-optimized Python UDF

### What changes were proposed in this pull request?

This PR implements 0-arg implementation in Arrow-optimized Python UDF.

### Why are the changes needed?

We enabled `spark.sql.execution.pythonUDF.arrow.enabled` by default. We should make sure edge cases work.

### Does this PR introduce _any_ user-facing change?

Yes, it will optimize with the Arrow for regular Python UDFs with 0-arg implementation.

### How was this patch tested?

A lot of existing unit tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50084 from HyukjinKwon/0-arg-support.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 9efaa91deb502cadbaddb8ca4c934bd8529aeaad)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-27T00:30:38Z)
- ea71591: [SPARK-51273][SQL] Spark Connect Call Procedure runs the procedure twice

### What changes were proposed in this pull request?
Return CommandResult in InvokeProcedure rule instead of LocalRelation

### Why are the changes needed?
Running 'call procedure' via Spark connect results in the procedure getting called twice.

The first call is from `org.apache.spark.sql.connect.SparkSession.sql` method.  This sends the plan over to be evaluated.  This  invokes the procedure once in InvokeProcedure rule.  This then returns LocalRelation which is the original sql.  This is encapsulated in org.apache.spark.sql.connect.DataSet.

The second call is from  `org.apache.spark.sql.connect.DataSet.collect()`.  It sends the sql over again, and is evaluated.

Changing the return value to be a CommandResult makes it so that the DataSet embeds the result instead of sql, and collect() just returns the result.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Added a SparkConnect integration test.  Changed the InMemoryCatalog its using to implement using Procedure Catalog

### Was this patch authored or co-authored using generative AI tooling?

Closes #50031 from szehon-ho/SPARK-51273.

Authored-by: Szehon Ho <szehon.apache@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 04af02fd6c6ea0e91489f303415d076f87309e13)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Szehon Ho on 2025-02-27T00:41:07Z)
- f594825: [SPARK-51324][SQL] Fix nested FOR statement throwing error if empty result

### What changes were proposed in this pull request?
FOR statement will currently fail if it is nested in a compound statement, is the only statement in that body AND returns an empty result. For example:

```
BEGIN
 CREATE TABLE t (intCol INT) using parquet;
 REPEAT
   FOR SELECT * FROM t ORDER BY intCol DO
     SELECT intCol;
   END FOR;
 UNTIL 1 = 1
 END REPEAT;
END
```

throws
`[INTERNAL_ERROR] No more elements to iterate through in the current SQL compound statement. SQLSTATE: XX000
`
This happens because the enclosing statement (REPEAT in this case) always expects at least one single statement in it's body which it can return. However, if the FOR has an empty result it doesn't have anything to return, and there is no other statement in the body, so the exception is thrown.

In this PR, FOR is updated to return NOOP statement in this specific case.

### Why are the changes needed?
To fix the bug.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Tests which were previously ignored due to this bug are no longer ignored.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50090 from dusantism-db/scripting-for-fix-empty-result-v2.

Authored-by: Dušan Tišma <dusan.tisma@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 989844621f55148eee9eb9e876cd673004ae0b63)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dušan Tišma on 2025-02-27T00:44:10Z)
- dc018d1: [SPARK-51206][PYTHON][CONNECT] Move Arrow conversion helpers out of Spark Connect

### What changes were proposed in this pull request?

Refactor `pyspark.sql.connect.conversion` to move `LocalDataToArrowConversion` and `ArrowTableToRowsConversion` into `pyspark.sql.conversion`.

The reason is that `pyspark.sql.connect.conversion` checks for Spark Connect dependencies such as `pyarrow`, `grpcio` and `pandas`, but `LocalDataToArrowConversion` and `ArrowTableToRowsConversion` only need `pyarrow`.

`pyspark.sql.connect.conversion` still re-exports the two classes for backward compatibility.

### Why are the changes needed?

Python Data Sources should work without Spark Connect dependencies but currently it imports `LocalDataToArrowConversion` and `ArrowTableToRowsConversion` from `pyspark.sql.connect.conversion` making it require unnecessary dependencies. This change moves these two classes to `pyspark.sql.conversion` so that Python Data Sources runs without Spark Connect dependencies.

### Does this PR introduce _any_ user-facing change?

Relaxed requirements for using Python Data Sources.

### How was this patch tested?

Existing tests should make sure that the changes don't break anything.

Manually tested to ensure that Python Data Sources can run without grpcio and pandas.

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #49941 from wengh/spark-51206-pyds-fix-dependency.

Authored-by: Haoyu Weng <wenghy02@gmail.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 727167acc30c7a50566dad0c030763e34b450cca)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Haoyu Weng on 2025-02-27T02:37:54Z)
- 7ab4c53: [SPARK-50792][SQL][TESTS][FOLLOWUP] Test case should reuse the exists table

### What changes were proposed in this pull request?
This PR proposes update the test case by reuse the exists table.

### Why are the changes needed?
https://github.com/apache/spark/pull/49452 created a new table for binary test.
But there are already exists a table with binary schema.

This PR also rename the test table with binary schema to a better name.

### Does this PR introduce _any_ user-facing change?
'No'.
Just update test case.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50087 from beliefer/SPARK-50792_f2.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 2fca41c3ca2846d94124e738af154f7a85eb9243)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by beliefer on 2025-02-27T04:19:21Z)
- 35252d7: [SPARK-51316][PYTHON] Allow Arrow batches in bytes instead of number of rows

### What changes were proposed in this pull request?

This PR allows Arrow batches in bytes instead of number of rows

### Why are the changes needed?

We enabled `spark.sql.execution.pythonUDF.arrow.enabled` by default, and we should make sure users won't hit OOM.

### Does this PR introduce _any_ user-facing change?

Yes. Now we will make the Arrow batches in bytes 256MB by default, and users can configure this

### How was this patch tested?

Tested with changing default value to 1KB, and added a unittest. Also manually tested as below:

```python
from pyspark.sql.functions import pandas_udf
import pandas as pd

# spark.conf.set("spark.sql.execution.arrow.maxBytesPerBatch", "1K")
# spark.conf.set("spark.sql.execution.arrow.maxBytesPerBatch", "2K")
# spark.conf.set("spark.sql.execution.arrow.maxRecordsPerBatch", "1")
# spark.conf.set("spark.sql.execution.arrow.maxRecordsPerBatch", "10")

pandas_udf("long")
def func(s: pd.Series) -> pd.Series:
    return s

a = spark.range(100000).select(func("id")).collect()
```

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50080 from HyukjinKwon/bytes-arrow.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 53fc763132341b30162c55bd95dc40a89b497c84)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-27T05:11:51Z)
- 9f77a55: [SPARK-51323][PYTHON] Duplicate "total" on Py SQL metrics

### What changes were proposed in this pull request?

"total" is mentioned twice for PythonSQLMetrics.

### Why are the changes needed?

Make metrics less confusing.

### Does this PR introduce _any_ user-facing change?

Updates the metric presentation string.

### How was this patch tested?

Existing tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50089 from sebastianhillig-db/duplicate-time-in-metrics.

Authored-by: Sebastian Hillig <sebastian.hillig@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 3ba50cdeb159f818d104ffa7ad3ae9a5340723a9)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Sebastian Hillig on 2025-02-27T06:56:08Z)
- 77c7265: [SPARK-51302][CONNECT] Spark Connect supports JDBC should use the DataFrameReader API

### What changes were proposed in this pull request?
This PR proposes to unify the calling to the `DataFrameReader` API in Spark Connect where supports the jdbc API.

### Why are the changes needed?
The origin code is good at a little advance of performance, but it is bad if we change the logic of jdbc API.
I think we should unify the code path here.

### Does this PR introduce _any_ user-facing change?
'No'.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50059 from beliefer/SPARK-51302.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit 70d532a796e28d2d614dbf9795a02f2b74e30901)
Signed-off-by: beliefer <beliefer@163.com> (by beliefer on 2025-02-27T07:25:10Z)
- ad174c4: [SPARK-51322][SQL] Better error message for streaming subquery expression

### What changes were proposed in this pull request?

Today, if a user creates a subquery expression with a streaming query (using the new DataFrame subquery API, or manipulating logical plans directly), he/she will hit weird errors:
- for uncorrelated subquery expressions, Spark will invoke the batch planner to plan the subquery and hit an error because streaming plans are not recognized by the batch planner.
- for correlated subquery expressions in a batch query, it will be rewritten to joins, but the outer batch query is passed to the batch planner and we hit the same error as the previous one
- for correlated subquery expressions in a streaming query, the streaming execution does not go into subqueries to replace  `StreamingRelationV2` with `StreamingDataSourceV2ScanRelation`, and after subquery rewriting, the `StreamingRelationV2` will remain and make Spark fail at runtime by `StreamingRelationExec cannot be executed`.

This PR proposes to check streaming subquery expression and fail earlier.

### Why are the changes needed?

better error message

### Does this PR introduce _any_ user-facing change?

Yes, but it's only error message change

### How was this patch tested?

new test

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #50088 from cloud-fan/stream.

Authored-by: Wenchen Fan <wenchen@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit e61a885e217ed5b97e97dee2f311bc51bc85086b)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Wenchen Fan on 2025-02-27T09:19:59Z)
- 68d10f3: [SPARK-50994][CORE] Perform RDD conversion under tracked execution

### What changes were proposed in this pull request?
- A new lazy variable `materializedRdd` is introduced which actualyl holds RDD after it is created (by executing plan).
- `Dataset#rdd` is wrapped within `withNewRDDExecutionId`, which takes care of important setup tasks, like updating Spark properties in `SparkContext`'s thread-locals, before executing the `SparkPlan` to fetch data
- `Dataset#rdd` acts like any other RDD operations like `reduce` or `foreachPartition` and operates on `materializedRdd` with new execution id (and initialising it if not done yet)

### Why are the changes needed?
When `Dataset` is converted into `RDD`, It executes `SpakPlan` without any execution context. This leads to:
1. No tracking is available on Spark UI for stages which are necessary to build the `RDD`.
2. Spark properties which are local to thread may not be set in the `RDD` execution context. This leads to these properties not being sent with `TaskContext` but some operations like reading parquet files depend on these properties (eg, case-sesitivity).

Test scenario:
```java
test("SPARK-50994: RDD conversion is performed with execution context") {
    withSQLConf(SQLConf.CASE_SENSITIVE.key -> "true") {
      withSQLConf(SQLConf.PARQUET_VECTORIZED_READER_ENABLED.key -> "false") {
        withTempDir(dir => {
          val dummyDF = Seq((1, 1.0), (2, 2.0), (3, 3.0), (1, 1.0)).toDF("a", "A")
          dummyDF.write.format("parquet").mode("overwrite").save(dir.getCanonicalPath)

          val df = spark.read.parquet(dir.getCanonicalPath)
          val encoder = ExpressionEncoder(df.schema)
          val deduplicated = df.dropDuplicates(Array("a"))
          val df2 = deduplicated.flatMap(row => Seq(row))(encoder).rdd

          val output = spark.createDataFrame(df2, df.schema)
          checkAnswer(output, Seq(Row(1, 1.0), Row(2, 2.0), Row(3, 3.0)))
        })
      }
    }
  }
```
In the above scenario,
- Call to `.rdd` triggers execution which performs shuffle after reading parquet
- However, while reading parquet file `spark.sql.caseSensitive` is not set (even though it is passed during session creation) which is referred into `SQLConf` by `parquet-mr` reader
- This leads to unexpected and wrong result of `dropDuplicates` as it would drop duplicates by either `a` or 'A'. Expectation is to drop duplicates by column `a`
- This behaviour is not applicable to vectorized parquet reader because it reads case-sensitivity flag from `hadoopContext` hence is disabled.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Existing testcases & new test case added for specific scenario

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #49678 from BOOTMGR/SPARK-50994.

Authored-by: BOOTMGR <panchal.harsh18@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 07e6a06101515b1ff68e57bdcff5a509d4d6c72c)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by BOOTMGR on 2025-02-27T10:14:41Z)
- 6599fe4: [SPARK-51310][SQL] Resolve the type of default string producing expressions

### What changes were proposed in this pull request?
Add casts to `DefaultStringProducingExpression` to have the correct type based on the default string type.

Currently, we can only test this on views, until we implement schema level collations when we will be able to test the behavior on newly created tables as well.

### Why are the changes needed?
These expressions should return the default string type, which could be different in some DDL commands.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Added unit tests for view creation.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50053 from stefankandic/resolveDefaultStringExprs.

Authored-by: Stefan Kandic <stefan.kandic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 412da42ab2e91a643980634d032fec0738a59590)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Stefan Kandic on 2025-02-27T10:18:41Z)
- 6ea3c09: [SPARK-51281][SQL] DataFrameWriterV2 should respect the path option

### What changes were proposed in this pull request?

Unlike `DataFrameWriter.saveAsTable` where we explicitly get the "path" option and treat it as table location, `DataFrameWriterV2` doesn't do it and treats the "path" option as a normal option which doesn't have any real impact.

This PR fixes it, and adds a legacy config to restore the old behavior.

### Why are the changes needed?

bug fix

### Does this PR introduce _any_ user-facing change?

Yes, now `DataFrameWriterV2` can correctly write data to the specified path for file source tables.

### How was this patch tested?

new test

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #50040 from cloud-fan/prop.

Lead-authored-by: Wenchen Fan <cloud0fan@gmail.com>
Co-authored-by: Wenchen Fan <wenchen@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit a3671e55839c3305c19ae9b135c57357b43740e4)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Wenchen Fan on 2025-02-27T13:25:35Z)
- e9e4fcc: [SPARK-51326][CONNECT][4.0] Remove LazyExpression proto message

### What changes were proposed in this pull request?

This is a backport of #50093.

Removes `LazyExpression` proto message.

As any feature using this proto message is not released yet, it's safe to remove it from master and branch-4.0.

### Why are the changes needed?

Discussed offline and found out that Spark Connect should work without it.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

The existing tests should pass.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50094 from ueshin/issues/SPARK-51326/4.0/lazy_expression.

Authored-by: Takuya Ueshin <ueshin@databricks.com>
Signed-off-by: Takuya Ueshin <ueshin@databricks.com> (by Takuya Ueshin on 2025-02-27T19:16:43Z)
- 6cbb64c: [SPARK-51278][FOLLOWUP][DOCS] Update JSON format from documentation

### What changes were proposed in this pull request?

This PR followups https://github.com/apache/spark/pull/50038 to update documentation following the fixed JSON format.

### Why are the changes needed?

To match the docs with real logging format

### Does this PR introduce _any_ user-facing change?

No API changes, but the user-facing documentation updated.

### How was this patch tested?

CI

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50100 from itholic/json_format_followup.

Authored-by: Haejoon Lee <haejoon.lee@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit b05f18b6424ac492906615534efb610460e9f2c4)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Haejoon Lee on 2025-02-28T00:12:00Z)
- 4ea2519: [SPARK-51303][SQL][TESTS] Extend `ORDER BY` testing coverage

### What changes were proposed in this pull request?
I propose that we extend `order-by-all.sql` and `DataFrameSuite.scala` and add `order-by.sql` which extend the coverage of `ORDER BY` feature.

### Why are the changes needed?
In order to catch potential bugs.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Added tests.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50069 from mihailoale-db/addorderbygoldenfiles.

Authored-by: mihailoale-db <mihailo.aleksic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 71422d1903d2b39a68058388e839f7bd3d3f4ab2)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by mihailoale-db on 2025-02-28T00:52:30Z)
- f99b097: [SPARK-51270][SQL] Support UUID type in Variant

### What changes were proposed in this pull request?

Four new types were added to the Parquet Variant spec (https://github.com/apache/parquet-format/commit/25f05e73d8cd7f5c83532ce51cb4f4de8ba5f2a2): UUID, Time, Timestamp(NANOS) and TimestampNTZ(NANOS). They don't correspond to an existing Spark type, so there is no need to allow them to be constructed in Spark. But when reading from another tool, we should be able to handle them gracefully: specifically, casts to JSON/string should work, and SchemaOfVariant should produce a reasonable result.

This PR only adds support for UUID. Support for the other types should be similar, mainly differing in the details of casting to string.

### Why are the changes needed?

Support reading Variant values produced by other tools.

### Does this PR introduce _any_ user-facing change?

In Spark 4.0, we would fail when trying to read a Variant value containing UUID. With this change, we should be able to handle it.

### How was this patch tested?

Added unit tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50025 from cashmand/uuid_support.

Authored-by: cashmand <david.cashman@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 3478e6b89f9938353171e4ddd05ca03bad4c91ac)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by cashmand on 2025-02-28T02:25:47Z)
- 006d18c: [SPARK-51339][BUILD] Remove `IllegalImportsChecker` for `s.c.Seq/IndexedSeq` from `scalastyle-config.xml`

### What changes were proposed in this pull request?
This pr aims to remove `IllegalImportsChecker` for `s.c.Seq/IndexedSeq` from `scalastyle-config.xml` because after Spark 4.0, only Scala 2.13 is supported, eliminating the issue of cross-compilation.

### Why are the changes needed?
Cleaning up outdated scala style checking rule.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Pass GitHub Actions

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50105 from LuciferYang/SPARK-51339.

Authored-by: yangjie01 <yangjie01@baidu.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit ddd0af615cd74cab16ff001d36df48631d05c8c9)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by yangjie01 on 2025-02-28T02:29:24Z)
- 52e9360: [SPARK-49756][SQL][FOLLOWUP] Use correct pgsql datetime fields when pushing down EXTRACT

### What changes were proposed in this pull request?

This is a followup of https://github.com/apache/spark/pull/48210 to fix correctness issues caused by pgsql filter pushdown. These datetime fields were picked wrongly before, see https://neon.tech/postgresql/postgresql-date-functions/postgresql-extract

### Why are the changes needed?

bug fix

### Does this PR introduce _any_ user-facing change?

Yes, query result is corrected, but this bug is not released yet.

### How was this patch tested?

updated test

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #50101 from cloud-fan/pgsql.

Authored-by: Wenchen Fan <wenchen@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 208a7ee6771d1fe7e6c240a8add0c8f72ba5a484)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Wenchen Fan on 2025-02-28T05:57:59Z)
- 85188c0: Preparing Spark release v4.0.0-rc2 (by Wenchen Fan on 2025-02-28T09:23:59Z)
- dcc2f3c: Preparing development version 4.0.1-SNAPSHOT (by Wenchen Fan on 2025-02-28T09:24:03Z)
- 1df6fc6: [SPARK-51316][PYTHON][FOLLOW-UP] Revert unrelated changes and mark mapInPandas/mapInArrow batched in byte size

### What changes were proposed in this pull request?

This PR is a followup of https://github.com/apache/spark/pull/50096 that reverts unrelated changes and mark mapInPandas/mapInArrow batched in byte size

### Why are the changes needed?

To make the original change self-contained, and mark mapInPandas/mapInArrow batched in byte size to be consistent.

### Does this PR introduce _any_ user-facing change?

No, the main change has not been released out yet.

### How was this patch tested?

Manually.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50111 from HyukjinKwon/SPARK-51316-followup.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 5b45671654003d4292bd97dab3e6ff9ff9a8e651)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-02-28T11:23:13Z)
- 13d9c91: [SPARK-51351][SS] Do not materialize the output in Python worker for TWS

### What changes were proposed in this pull request?

This PR proposes to fix the logic of serializer in TWS PySpark version to NOT materialize the output entirely. This PR changes the logic of creating a list to create a generator instead, so that it can be lazily consumed.

### Why are the changes needed?

Without this PR, all the outputs are materialized when JVM signals to Python worker that there is no further input (at task completion), which brings up two critical issues:

* downstream operator can only see outputs after TWS operator processes all inputs
* all the outputs are materialized into "memory" in Python worker, which could lead memory issue

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Existing UTs. I've confirmed manually below:

* Before this PR, all the outputs are available after processing all inputs
* After this PR, outputs are available during processing inputs

The change I have made to verify the fix manually:
https://github.com/HeartSaVioR/spark/commit/cd30db0746bd59dde032d7f209e8657f4f7d93c5

If we call run_test() in testcode.py in PySpark, the log messages `Spark pulls the iterators` and `The data is being retrieved from Python worker` are interleaved with this fix. Without the fix, there is a sequence of log messages, all `Spark pulls the iterators` messages come first, and then all `The data is being retrieved from Python worker` messages come later.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50110 from HeartSaVioR/SPARK-51351.

Authored-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 496fe7a50919ccf291836bfb789b22402d7221e9)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Jungtaek Lim on 2025-02-28T22:04:56Z)
- e355228: [SPARK-49960][SQL] Custom ExpressionEncoder support and TransformingEncoder fixes

### What changes were proposed in this pull request?

4.0.0-preview2 introduced, as part of SPARK-49025 pr #47785, changes which drive ExpressionEncoder derivation purely from AgnosticEncoders.  This PR adds a trait:

```scala
DeveloperApi
trait AgnosticExpressionPathEncoder[T]
  extends AgnosticEncoder[T] {
  def toCatalyst(input: Expression): Expression
  def fromCatalyst(inputPath: Expression): Expression
}
```

and hooks in the De/SerializationBuildHelper matches to allow seamless extension of non-connect custom encoders (such as [frameless](https://github.com/typelevel/frameless) or [sparksql-scalapb](https://github.com/scalapb/sparksql-scalapb)).

SPARK-49960 provides the same information.

Additionally this PR provides fixes necessary to use TransformingEncoder as a root encoder with an OptionalEncoder, use as an ArrayType and MapType entry/key.

### Why are the changes needed?

Without this change (or similar) there is no way for custom encoders to integrate with 4.0.0-preview2 derived encoders, something which has worked and devs have benefited from since pre 2.4 days.  This stops code such as Dataset.joinWith from deriving a tuple encoder which works (as the provided ExpressionEncoder is now discarded under preview2).  Supplying a custom AgnosticEncoder under preview2 also fails as only the preview2 AgnosticEncoders are supported in De/SerializationBuildHelper, triggering a MatchError.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Test was added using a "custom" string encoder and joinWith based on an existing joinWith test.  Removing the case statements in either BuildHelper will trigger the MatchError.

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50023 from chris-twiner/temp/expressionEncoder_compat_TransformingEncoder_fixes.

Authored-by: Chris Twiner <chris.twiner@gmail.com>
Signed-off-by: Herman van Hovell <herman@databricks.com>
(cherry picked from commit 50a328ba98577ea12bbae50f2cbf406438b01a2f)
Signed-off-by: Herman van Hovell <herman@databricks.com> (by Chris Twiner on 2025-03-01T01:02:24Z)
- c087a1c: [MINOR][TESTS][CONNECT] Fix the teardown function of test_connect_function.py

### What changes were proposed in this pull request?
It is a small fix to a typo in teardown function of a test where instead of calling teardown of the parent object we are calling setup.

### Why are the changes needed?
This typo needs to be fixed

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
This is already covered by the changed test.

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50120 from sfc-gh-dyadav/patch-1.

Authored-by: Deepak Yadav <deepak.yadav@snowflake.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit d88db28910d0da398f6623f85ddcde55d77e1b24)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Deepak Yadav on 2025-03-02T02:06:23Z)
- fcf5619: [SPARK-51354][K8S][TEST][DOC] Fix sbt K8s integration test arg javaImageTag

### What changes were proposed in this pull request?

As title.

### Why are the changes needed?

When I follow the dev docs to run K8s IT using sbt, and set `spark.kubernetes.test.javaImageTag` to change the JDK image

```
$ build/sbt -Pkubernetes -Pkubernetes-integration-tests \
  -Dspark.kubernetes.test.javaImageTag=17 \
  -Dspark.kubernetes.test.namespace=default \
  -Dtest.exclude.tags=local,r,minikube \
  "kubernetes-integration-tests/test"
```

I face the following errors
```
Dockerfile:19
--------------------
  17 |     ARG java_image_tag=21
  18 |
  19 | >>> FROM azul/zulu-openjdk:${java_image_tag}
  20 |     LABEL org.opencontainers.image.authors="Apache Spark project <devspark.apache.org>"
  21 |     LABEL org.opencontainers.image.licenses="Apache-2.0"
--------------------
ERROR: failed to solve: failed to parse stage name "azul/zulu-openjdk:Some(17)": invalid reference format
Failed to build Spark JVM Docker image, please refer to Docker build output for details.
[error] java.lang.IllegalStateException: Process '/Users/chengpan/Projects/apache-spark/bin/docker-image-tool.sh -r docker.io/kubespark -t dev -p /Users/chengpan/Projects/apache-spark/resource-managers/kubernetes/docker/src/main/dockerfiles/spark/bindings/python/Dockerfile -R  -b java_image_tag=Some(17) build' exited with 1.
[error] 	at KubernetesIntegrationTests$.$anonfun$settings$66(SparkBuild.scala:1020)
...
```

### Does this PR introduce _any_ user-facing change?

No, dev only.

### How was this patch tested?

```
$ build/sbt -Pkubernetes -Pkubernetes-integration-tests \
  -Dspark.kubernetes.test.javaImageTag=17 \
  -Dspark.kubernetes.test.namespace=default \
  -Dtest.exclude.tags=local,r,minikube \
  "kubernetes-integration-tests/test"
```
Correctly trigger the K8s integration tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50113 from pan3793/SPARK-51354.

Authored-by: Cheng Pan <chengpan@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 4df5abc33e2f4ff23bb9f825f976273823c688b4)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Cheng Pan on 2025-03-03T01:45:12Z)
- ebc61d9: [SPARK-51353][INFRA][BUILD] Retry dyn/closer.lua for mvn before falling back to archive.a.o

### What changes were proposed in this pull request?

This PR enables retry for dyn/closer.lua for mvn before falling back to archive.a.o.

Before this PR, we used `curl` w/o retry to download the whole maven tar ball once to check if we need to fall back to archive.a.o. This is unreliable and a bit wasteful.

In this PR, we enable retry to reduce service transient errors and only fetch asc to reduce network/time cost.

```
apache-maven-3.9.9-bin.tar.gz  2024-08-17 18:44  8.7M
apache-maven-3.9.9-bin.tar.gz.asc 2024-08-17 18:44  228
apache-maven-3.9.9-bin.tar.gz.sha512 2024-08-17 18:44  128
```

### Why are the changes needed?
Make dyn/closer.lua mirror first and reliable

### Does this PR introduce _any_ user-facing change?
no, dev only

### How was this patch tested?
```
build/mvn clean
exec: curl --retry 3 --silent --show-error -L https://www.apache.org/dyn/closer.lua/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz?action=download
exec: curl --retry 3 --silent --show-error -L https://www.apache.org/dyn/closer.lua/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz.sha512?action=download
Verifying checksum from /Users/hzyaoqin/spark/build/apache-maven-3.9.9-bin.tar.gz.sha512
Using `mvn` from path: /Users/hzyaoqin/spark/build/apache-maven-3.9.9/bin/mvn
```

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50114 from yaooqinn/SPARK-51353.

Authored-by: Kent Yao <yao@apache.org>
Signed-off-by: Kent Yao <yao@apache.org>
(cherry picked from commit ec03f1e35cc13b93bf8c851399c5ec644df07e19)
Signed-off-by: Kent Yao <yao@apache.org> (by Kent Yao on 2025-03-03T05:51:56Z)
- 61d1bfd: [SPARK-49489][SQL][HIVE] HMS client respects `hive.thrift.client.maxmessage.size`

### What changes were proposed in this pull request?

Partly port HIVE-26633 for Spark HMS client - respect `hive.thrift.client.max.message.size` if present and the value is positive.

> Thrift client configuration for max message size. 0 or -1 will use the default defined in the Thrift library. The upper limit is 2147483648 bytes (or 2gb).

Note: it's a Hive configuration, I follow the convention to not document on the Spark side.

### Why are the changes needed?

1. THRIFT-5237 (0.14.0) changes the max thrift message size from 2GiB to 100MiB
2. HIVE-25098 (4.0.0) upgrades Thrift from 0.13.0 to 0.14.1
3. HIVE-25996 (2.3.10) backports HIVE-25098 to branch-2.3
4. HIVE-26633 (4.0.0) introduces `hive.thrift.client.max.message.size`
5. SPARK-47018 (4.0.0) upgrades Hive from 2.3.9 to 2.3.10

Thus, Spark's HMS client does not respect `hive.thrift.client.max.message.size` and has a fixed max thrift message size 100MiB, users may hit the "MaxMessageSize reached" exception on accessing Hive tables with a large number of partitions.

See discussion in https://github.com/apache/spark/pull/46468#issuecomment-2670780892

### Does this PR introduce _any_ user-facing change?

No, it tackles the regression introduced by an unreleased change, namely SPARK-47018. The added code only takes effect when the user configures `hive.thrift.client.max.message.size` explicitly.

### How was this patch tested?

This must be tested manually, as the current Spark UT does not cover the remote HMS cases.

I constructed a test case in a testing Hadoop cluster with a remote HMS.

Firstly, create a table with a large number of partitions.
```
$ spark-sql --num-executors=6 --executor-cores=4 --executor-memory=1g \
    --conf spark.hive.exec.dynamic.partition.mode=nonstrict \
    --conf spark.hive.exec.max.dynamic.partitions=1000000
spark-sql (default)> CREATE TABLE p PARTITIONED BY (year, month, day) STORED AS PARQUET AS
SELECT /*+ REPARTITION(200) */ * FROM (
  (SELECT CAST(id AS STRING) AS year FROM range(2000, 2100)) JOIN
  (SELECT CAST(id AS STRING) AS month FROM range(1, 13)) JOIN
  (SELECT CAST(id AS STRING) AS day FROM range(1, 31)) JOIN
  (SELECT 'this is some data' AS data)
);
```

Then try to tune `hive.thrift.client.max.message.size` and run a query that would trigger `getPartitions` thrift call. For example, when set to `1kb`, it throws `TTransportException: MaxMessageSize reached`, and the exception disappears after boosting the value.
```
$ spark-sql --conf spark.hive.thrift.client.max.message.size=1kb
spark-sql (default)> SHOW PARTITIONS p;
...
2025-02-20 15:18:49 WARN RetryingMetaStoreClient: MetaStoreClient lost connection. Attempting to reconnect (1 of 1) after 1s. listPartitionNames
org.apache.thrift.transport.TTransportException: MaxMessageSize reached
	at org.apache.thrift.transport.TEndpointTransport.checkReadBytesAvailable(TEndpointTransport.java:81) ~[libthrift-0.16.0.jar:0.16.0]
	at org.apache.thrift.protocol.TProtocol.checkReadBytesAvailable(TProtocol.java:67) ~[libthrift-0.16.0.jar:0.16.0]
	at org.apache.thrift.protocol.TBinaryProtocol.readListBegin(TBinaryProtocol.java:297) ~[libthrift-0.16.0.jar:0.16.0]
	at org.apache.hadoop.hive.metastore.api.ThriftHiveMetastore$get_partition_names_result$get_partition_names_resultStandardScheme.read(ThriftHiveMetastore.java) ~[hive-metastore-2.3.10.jar:2.3.10]
	at org.apache.hadoop.hive.metastore.api.ThriftHiveMetastore$get_partition_names_result$get_partition_names_resultStandardScheme.read(ThriftHiveMetastore.java) ~[hive-metastore-2.3.10.jar:2.3.10]
	at org.apache.hadoop.hive.metastore.api.ThriftHiveMetastore$get_partition_names_result.read(ThriftHiveMetastore.java) ~[hive-metastore-2.3.10.jar:2.3.10]
	at org.apache.thrift.TServiceClient.receiveBase(TServiceClient.java:88) ~[libthrift-0.16.0.jar:0.16.0]
	at org.apache.hadoop.hive.metastore.api.ThriftHiveMetastore$Client.recv_get_partition_names(ThriftHiveMetastore.java:2458) ~[hive-metastore-2.3.10.jar:2.3.10]
	at org.apache.hadoop.hive.metastore.api.ThriftHiveMetastore$Client.get_partition_names(ThriftHiveMetastore.java:2443) ~[hive-metastore-2.3.10.jar:2.3.10]
	at org.apache.hadoop.hive.metastore.HiveMetaStoreClient.listPartitionNames(HiveMetaStoreClient.java:1487) ~[hive-metastore-2.3.10.jar:2.3.10]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[?:?]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77) ~[?:?]
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[?:?]
	at java.base/java.lang.reflect.Method.invoke(Method.java:569) ~[?:?]
	at org.apache.hadoop.hive.metastore.RetryingMetaStoreClient.invoke(RetryingMetaStoreClient.java:173) ~[hive-metastore-2.3.10.jar:2.3.10]
	at jdk.proxy2/jdk.proxy2.$Proxy54.listPartitionNames(Unknown Source) ~[?:?]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[?:?]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77) ~[?:?]
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[?:?]
	at java.base/java.lang.reflect.Method.invoke(Method.java:569) ~[?:?]
	at org.apache.hadoop.hive.metastore.HiveMetaStoreClient$SynchronizedHandler.invoke(HiveMetaStoreClient.java:2349) ~[hive-metastore-2.3.10.jar:2.3.10]
	at jdk.proxy2/jdk.proxy2.$Proxy54.listPartitionNames(Unknown Source) ~[?:?]
	at org.apache.hadoop.hive.ql.metadata.Hive.getPartitionNames(Hive.java:2461) ~[hive-exec-2.3.10-core.jar:2.3.10]
	at org.apache.spark.sql.hive.client.Shim_v2_0.getPartitionNames(HiveShim.scala:976) ~[spark-hive_2.13-4.1.0-SNAPSHOT.jar:4.1.0-SNAPSHOT]
...
```

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50022 from pan3793/SPARK-49489.

Authored-by: Cheng Pan <chengpan@apache.org>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 2ea5621a6053ff6daef920bbf20fe56d4eada69c)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by Cheng Pan on 2025-03-03T08:55:51Z)
- 246191d: Revert "[SPARK-51353][INFRA][BUILD] Retry dyn/closer.lua for mvn before falling back to archive.a.o"

This reverts commit ebc61d98a95cd725222355858705c9ccefed9480. (by Kent Yao on 2025-03-03T09:47:40Z)
- 5bc6e14: [SPARK-51369][SQL] Fix FOR cursor variable to work with mixed case names

### What changes were proposed in this pull request?

This pull request fixes a bug where variable used for cursor/iterator in FOR loop doesn't work if the variable name is not strictly lowercase.

In this example:
```
FOR LoopCursor AS (SELECT * FROM VALUES (1), (2), (3) AS tbl(RowValue)) DO
  SET sum = sum + LoopCursor.RowValue;
END FOR;
```
a `LoopCursor.RowValue cannot be resolved` exception would be thrown.

### Why are the changes needed?

These changes are fixing a bug.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Unit test in `SqlScriptingInterpreterSuite`.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50132 from davidm-db/for_fix_variable_scope.

Authored-by: David Milicevic <david.milicevic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit b4896c0f3e836397f0f45088290c36c168385363)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by David Milicevic on 2025-03-03T15:42:24Z)
- 2246b1b: [SPARK-51229][BUILD][CONNECT] Fix dependency:analyze goal on connect common

### What changes were proposed in this pull request?
Update dependency of connect common library

### Why are the changes needed?
There are used and undeclared dependencies and also declared and not used:
```
[WARNING] Used undeclared dependencies found:
[WARNING]    com.google.guava:guava:jar:33.4.0-jre:provided
[WARNING]    org.apache.commons:commons-lang3:jar:3.17.0:compile
[WARNING]    org.scala-lang:scala-reflect:jar:2.13.16:compile
[WARNING]    com.google.api.grpc:proto-google-common-protos:jar:2.41.0:compile
[WARNING]    org.apache.arrow:arrow-vector:jar:18.1.0:compile
[WARNING]    org.apache.arrow:arrow-memory-core:jar:18.1.0:compile
[WARNING]    org.apache.spark:spark-connect-shims_2.13:jar:4.1.0-SNAPSHOT:compile
[WARNING]    org.apache.arrow:arrow-format:jar:18.1.0:compile
[WARNING]    org.slf4j:slf4j-api:jar:2.0.16:compile
[WARNING]    commons-codec:commons-codec:jar:1.17.2:compile
[WARNING]    org.json4s:json4s-core_2.13:jar:4.0.7:compile
[WARNING]    org.apache.spark:spark-unsafe_2.13:jar:4.1.0-SNAPSHOT:compile
[WARNING]    org.json4s:json4s-ast_2.13:jar:4.0.7:compile
[WARNING]    io.grpc:grpc-api:jar:1.67.1:compile
[WARNING]    org.apache.spark:spark-tags_2.13:jar:4.1.0-SNAPSHOT:compile
[WARNING]    org.apache.spark:spark-common-utils_2.13:jar:4.1.0-SNAPSHOT:compile
[WARNING] Unused declared dependencies found:
[WARNING]    io.grpc:grpc-netty:jar:1.67.1:compile
[WARNING]    io.grpc:grpc-services:jar:1.67.1:compile
[WARNING]    io.grpc:grpc-inprocess:jar:1.67.1:compile
[WARNING]    io.netty:netty-codec-http2:jar:4.1.117.Final:compile
[WARNING]    io.netty:netty-handler-proxy:jar:4.1.117.Final:compile
[WARNING]    io.netty:netty-transport-native-unix-common:jar:4.1.117.Final:compile
[WARNING]    org.apache.tomcat:annotations-api:jar:6.0.53:compile
[WARNING]    org.apache.spark:spark-tags_2.13:test-jar:tests:4.1.0-SNAPSHOT:test
[WARNING]    org.spark-project.spark:unused:jar:1.0.0:compile
[WARNING]    org.scalatest:scalatest_2.13:jar:3.2.19:test
[WARNING]    org.scalatestplus:scalacheck-1-18_2.13:jar:3.2.19.0:test
[WARNING]    org.scalatestplus:mockito-5-12_2.13:jar:3.2.19.0:test
[WARNING]    org.scalatestplus:selenium-4-21_2.13:jar:3.2.19.0:test
[WARNING]    org.junit.jupiter:junit-jupiter:jar:5.11.4:test
[WARNING]    com.github.sbt.junit:jupiter-interface:jar:0.13.3:test
```
and it causes errors while running JVM client tests:
```
./build/mvn -Dtest=none -DwildcardSuites=org.apache.spark.sql.connect.CatalogSuite test -pl sql/connect/client/jvm
...
*** RUN ABORTED ***
A needed class was not found. This could be due to an error in your runpath. Missing class: org/sparkproject/guava/cache/CacheLoader
  java.lang.NoClassDefFoundError: org/sparkproject/guava/cache/CacheLoader
  at org.apache.spark.sql.connect.test.SparkConnectServerUtils$.createSparkSession(RemoteSparkSession.scala:183)
  at org.apache.spark.sql.connect.test.RemoteSparkSession.beforeAll(RemoteSparkSession.scala:215)
  at org.apache.spark.sql.connect.test.RemoteSparkSession.beforeAll$(RemoteSparkSession.scala:213)
  at org.apache.spark.sql.connect.CatalogSuite.beforeAll(CatalogSuite.scala:30)
  at org.scalatest.BeforeAndAfterAll.liftedTree1$1(BeforeAndAfterAll.scala:212)
  at org.scalatest.BeforeAndAfterAll.run(BeforeAndAfterAll.scala:210)
  at org.scalatest.BeforeAndAfterAll.run$(BeforeAndAfterAll.scala:208)
  at org.apache.spark.sql.connect.CatalogSuite.run(CatalogSuite.scala:30)
  at org.scalatest.Suite.callExecuteOnSuite$1(Suite.scala:1178)
  at org.scalatest.Suite.$anonfun$runNestedSuites$1(Suite.scala:1225)
  ...
  Cause: java.lang.ClassNotFoundException: org.sparkproject.guava.cache.CacheLoader
  at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:641)
  at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:188)
  at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:525)
  at org.apache.spark.sql.connect.test.SparkConnectServerUtils$.createSparkSession(RemoteSparkSession.scala:183)
  at org.apache.spark.sql.connect.test.RemoteSparkSession.beforeAll(RemoteSparkSession.scala:215)
  at org.apache.spark.sql.connect.test.RemoteSparkSession.beforeAll$(RemoteSparkSession.scala:213)
  at org.apache.spark.sql.connect.CatalogSuite.beforeAll(CatalogSuite.scala:30)
  at org.scalatest.BeforeAndAfterAll.liftedTree1$1(BeforeAndAfterAll.scala:212)
  at org.scalatest.BeforeAndAfterAll.run(BeforeAndAfterAll.scala:210)
  at org.scalatest.BeforeAndAfterAll.run$(BeforeAndAfterAll.scala:208)
```

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
The patch was tested using `build/mvn install` and `dependency:analyze`.

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #49971 from vrozov/SPARK-51229.

Authored-by: Vlad Rozov <vrozov@amazon.com>
Signed-off-by: Herman van Hovell <herman@databricks.com>
(cherry picked from commit 7653b400333085e038c6bfbc019d0849957ea5d0)
Signed-off-by: Herman van Hovell <herman@databricks.com> (by Vlad Rozov on 2025-03-03T20:44:22Z)
- 8547d1a: [SPARK-51374][CORE] Switch to Using java.util.Map in Logging APIs

### What changes were proposed in this pull request?

Update the internal logging APIs to use `java.util.Map` instead of the concrete `java.util.HashMap`.

### Why are the changes needed?

* Promotes more general usage of the API.
* Aligns with standard Java best practices by decoupling the API from a specific implementation.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

### Was this patch authored or co-authored using generative AI tooling?

Existing unit tests

Closes #50138 from gengliangwang/Map.

Authored-by: Gengliang Wang <gengliang@apache.org>
Signed-off-by: Gengliang Wang <gengliang@apache.org>
(cherry picked from commit 61859161778ba1ffce89a2cf3322328ab2f1f8a4)
Signed-off-by: Gengliang Wang <gengliang@apache.org> (by Gengliang Wang on 2025-03-03T22:52:30Z)
- 5c7c41b: [SPARK-51355][DOCS] Add a brief explanation for Spark Connect at PySpark Overview page

### What changes were proposed in this pull request?

This PR adds the brief explanation for Spark Connect at PySpark Overview page

![Screenshot 2025-02-28 at 7 35 07 PM](https://github.com/user-attachments/assets/ec190536-1fab-41f4-9b76-b3f000dbc8fc)

### Why are the changes needed?

To document the new component we added

### Does this PR introduce _any_ user-facing change?

No, documentation-only.

### How was this patch tested?

Manually.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50117 from HyukjinKwon/pyspark-connect-doc.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 8299a1458b2765e09a5e6eb0956ab1cb85feab74)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Hyukjin Kwon on 2025-03-03T23:01:03Z)
- 8a974a1: [SPARK-50578][PYTHON][SS][FOLLOW-UP] Add the Python new package into setup.py

### What changes were proposed in this pull request?

This PR is a followup of https://github.com/apache/spark/pull/49156 that adds the Python new package into `setup.py`.

### Why are the changes needed?

So pip installed pyspark support states with streaming queries

### Does this PR introduce _any_ user-facing change?

No, the main change has not been released out yet.

### How was this patch tested?

Will monitor the scheduled build https://github.com/apache/spark/actions/runs/13618426037/job/38064498674

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50128 from HyukjinKwon/SPARK-50578-followup2.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 4b2ae4864104b5e56a6422a119d60b2e1e35f357)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Hyukjin Kwon on 2025-03-03T23:03:21Z)
- a6db791: [SPARK-51363][SQL] Desc As JSON` clustering column names

### What changes were proposed in this pull request?

Include only column names for Desc As JSON `clustering_columns` field. Previously, `clustering_information` contained redundant column information, as clustering columns full StructType defn will already be included in the `columns` field of Desc As JSON.

### Why are the changes needed?

Clean up code to ensure consistency and update docs to include the `clustering_columns` field (and similar `partition_columns` which was previously not documented).

### Does this PR introduce _any_ user-facing change?

Yes, updates the output of SQL command `DESC AS JSON`

### How was this patch tested?

Added test

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50125 from asl3/asl3/clusteringinfo-test.

Authored-by: Amanda Liu <amanda.liu@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 86c2140b62e491c421488c457d599597c2f7e434)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Amanda Liu on 2025-03-04T03:04:05Z)
- b32207c: [SPARK-51375][SQL][CONNECT] Suppress `SparkConnect(Execution|Session)Manager.periodicMaintenance` log messages

### What changes were proposed in this pull request?

This PR aims to suppress `SparkConnect(Execution|Session)Manager.periodicMaintenance` methods' start and end log messages by lowering the log level from `INFO` to `DEBUG` from Apache Spark 4.0.0.

### Why are the changes needed?

From Apache Spark 4.0.0, we have a `SparkConnect`-on binary distribution.
- https://dist.apache.org/repos/dist/dev/spark/v4.0.0-rc2-bin/spark-4.0.0-bin-hadoop3-spark-connect.tgz

While testing Apache Spark 4.0.0 RC2, I found that these are too verbose in the production environments because it shows four info messages at every `30s` without giving important information.

```
25/03/03 23:27:45 INFO SparkConnectSessionManager: Started periodic run of SparkConnectSessionManager maintenance.
25/03/03 23:27:45 INFO SparkConnectSessionManager: Finished periodic run of SparkConnectSessionManager maintenance.
25/03/03 23:27:46 INFO SparkConnectExecutionManager: Started periodic run of SparkConnectExecutionManager maintenance.
25/03/03 23:27:46 INFO SparkConnectExecutionManager: Finished periodic run of SparkConnectExecutionManager maintenance.
25/03/03 23:28:15 INFO SparkConnectSessionManager: Started periodic run of SparkConnectSessionManager maintenance.
25/03/03 23:28:15 INFO SparkConnectSessionManager: Finished periodic run of SparkConnectSessionManager maintenance.
25/03/03 23:28:16 INFO SparkConnectExecutionManager: Started periodic run of SparkConnectExecutionManager maintenance.
25/03/03 23:28:16 INFO SparkConnectExecutionManager: Finished periodic run of SparkConnectExecutionManager maintenance.
```

Since Apache Spark will leave log messages for the actual clean-up operations like the following, we had better lower these start and end messages to `DEBUG` levels.

https://github.com/apache/spark/blob/4b2ae4864104b5e56a6422a119d60b2e1e35f357/sql/connect/server/src/main/scala/org/apache/spark/sql/connect/service/SparkConnectExecutionManager.scala#L260-L262

https://github.com/apache/spark/blob/4b2ae4864104b5e56a6422a119d60b2e1e35f357/sql/connect/server/src/main/scala/org/apache/spark/sql/connect/service/SparkConnectSessionManager.scala#L253-L255

### Does this PR introduce _any_ user-facing change?

No behavior change because this is only a log-message level change.

### How was this patch tested?

Manual review.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50139 from dongjoon-hyun/SPARK-51375.

Authored-by: Dongjoon Hyun <dongjoon@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit d5a17546f9e06a8cebdc8c5e65904efd81318bb6)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Dongjoon Hyun on 2025-03-04T05:11:02Z)
- 98e8579: [SPARK-45641][DOCS][FOLLOWUP] Add `Started At` description for web-ui.md

### What changes were proposed in this pull request?

SPARK-45641 added `Started At` at web ui, so we should fix the doc.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

No need.

Closes #50134 from tomscut/start-time.

Authored-by: tomscut <tomscut@apache.org>
Signed-off-by: Kent Yao <yao@apache.org>
(cherry picked from commit 0ce096dc8feb0c4d746f161203c99ec4c8e0f0f1)
Signed-off-by: Kent Yao <yao@apache.org> (by tomscut on 2025-03-04T05:39:12Z)
- 7cb92a5: [SPARK-51378][CORE] Apply JsonProtocol's accumulableExcludeList to ExecutorMetricsUpdate and TaskEndReason

### What changes were proposed in this pull request?

This PR updates `JsonProtocol` so that its `accumulableExcludeList` is considered when logging accumulable in TaskEndReasons and ExecutorMetricUpdate events.

This exclusion list was originally added in https://github.com/apache/spark/pull/17412 and originally only applied to StageInfo and TaskInfo logging.

### Why are the changes needed?

Reduce event log size and improve event logger throughput by avoiding the need to process possibly large / expensive accumulators.

This gap for ExecutorMetricsUpdate was noted in a comment (https://github.com/apache/spark/pull/17412#issuecomment-331018069); I recently rediscovered it in my own Spark usage.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Existing unit tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50141 from JoshRosen/apply-accumulableExcludeList-to-other-event-log-fields.

Authored-by: Josh Rosen <joshrosen@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 62f7f14edc53b12ecd6a3eb3b65254124efcc9f0)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Josh Rosen on 2025-03-04T06:36:50Z)
- c04dc04: [SPARK-51373][SS] Removing extra copy for column family prefix from 'ReplyChangelog'

### What changes were proposed in this pull request?

There is currently an extra copy when column families are enabled to first remove the column family prefix, and then one to add this column family prefix back when replaying the changelog. Because we don't do anything with this prefix or the raw bytes, we don't need to add and remove and can instead just passthrough.

### Why are the changes needed?

This change is needed for performance reasons for the TransformWithState operator - extra copies incur performance hit, and this change removes these extra copies.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Existing unit tests are sufficient, as we are not adding any new functionality.

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50119 from ericm-db/changelog-copy.

Authored-by: Eric Marnadi <eric.marnadi@databricks.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit c2f2be68dd09db0233ba67c35644b311233e501a)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Eric Marnadi on 2025-03-04T08:27:58Z)
- d32b7d5: [SPARK-50615][FOLLOWUP][SQL] Avoid dropping metadata in the push rule

### What changes were proposed in this pull request?

There is a bug in the optimizer rule that the `output` of the relation will be rebuilt based on the schema of the `HadoopFsRelation`. This schema doesn't include file metadata (the `_metadata` column). This PR fixes the bug. The new implementation no longer requires `hadoopFsRelation.schema` and `relation.output` to have the same order, which I don't think is guaranteed.

### Why are the changes needed?

It is a necessary bug fix.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Unit test. It would fail without the fix.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50121 from chenhao-db/fix_variant_pushdown_metadata.

Authored-by: Chenhao Li <chenhao.li@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 8f2c066cb1b7c80432863eb7cefeaf517bc1908f)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Chenhao Li on 2025-03-04T13:13:13Z)
- 298a9e0: [SPARK-51029][INFRA][FOLLOWUP] Remove LICENSE and NOTICE for unused/duplicated hive deps

### What changes were proposed in this pull request?

SPARK-51029 removed hive-llap, this PR removes all related license statements, while it also removes some duplicated hive items

### Why are the changes needed?

code cleaning

### Does this PR introduce _any_ user-facing change?
no

### How was this patch tested?

existing tests

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50146 from yaooqinn/SPARK-51029.

Authored-by: Kent Yao <yao@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 921ef95609cde581d4ae32ab8ce18ec58913941d)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Kent Yao on 2025-03-04T14:56:16Z)
- 0403c8e: [SPARK-51387][BUILD] Upgrade Netty to 4.1.119.Final

### What changes were proposed in this pull request?

This PR aims to Upgrade Netty to 4.1.119.Final.

### Why are the changes needed?

- https://github.com/netty/netty/milestone/309?closed=1
  - https://github.com/netty/netty/pull/14855
  - https://github.com/netty/netty/pull/14830
  - https://github.com/netty/netty/pull/14816
  - https://github.com/netty/netty/pull/14810

### Does this PR introduce _any_ user-facing change?

No behavior change.

### How was this patch tested?

Pass the CIs.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50150 from dongjoon-hyun/SPARK-51387.

Authored-by: Dongjoon Hyun <dongjoon@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 3d949af2e59ae1d03fdf6203139b3940409eee31)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Dongjoon Hyun on 2025-03-04T17:59:48Z)
- 050f4da: Revert "[SPARK-51387][BUILD] Upgrade Netty to 4.1.119.Final"

This reverts commit 0403c8ec1d1e4410f318d2ed0fa62aceedb82157. (by Dongjoon Hyun on 2025-03-04T22:54:32Z)
- e74236f: [SPARK-51314][DOCS][PS] Add proper note for distributed-sequence about indeterministic case

### What changes were proposed in this pull request?

This PR proposes to add proper note for distributed-sequence about indeterministic case

### Why are the changes needed?

There could be some indeterministic case leading users get confused when using `distributed-sequence` so we'd better to document it.

For example,

```python
# Reading the same data
>>> df1.read_csv("big_data.csv")
>>> df2.read_csv("big_data.csv")

# The row-index mapping for `df1` and `df2` could be different when using `distributed-sequence`.
>>> df1.head(10)
     record_id start_date   end_date
0  RECORD_1001 2024-01-01 2024-01-10
1  RECORD_1002 2024-01-15 2024-01-20
2  RECORD_1003 2024-02-01 2024-02-10
3  RECORD_1004 2024-02-15 2024-02-20
4  RECORD_1005 2024-03-01 2024-03-10
5  RECORD_1006 2024-03-15 2024-03-20
6  RECORD_1007 2024-04-01 2024-04-10
7  RECORD_1008 2024-04-15 2024-04-20
8  RECORD_1009 2024-05-01 2024-05-10
9  RECORD_1010 2024-05-15 2024-05-20

>>> df2.head(10)
     record_id start_date   end_date
0  RECORD_2001 2024-06-01 2024-06-10
1  RECORD_2002 2024-06-15 2024-06-20
2  RECORD_2003 2024-07-01 2024-07-10
3  RECORD_2004 2024-07-15 2024-07-20
4  RECORD_2005 2024-08-01 2024-08-10
5  RECORD_2006 2024-08-15 2024-08-20
6  RECORD_2007 2024-09-01 2024-09-10
7  RECORD_2008 2024-09-15 2024-09-20
8  RECORD_2009 2024-10-01 2024-10-10
9  RECORD_2010 2024-10-15 2024-10-20

# Using `index_col` prevent the indeterministic case
>>> df1.read_csv("big_data.csv", index_col="record_id")
>>> df2.read_csv("big_data.csv", index_col="record_id")

# Now this guarantees the order of the rows for both DataFrame
>>> df1.head(10)
            start_date   end_date
record_id
RECORD_1001 2024-01-01 2024-01-10
RECORD_1002 2024-01-15 2024-01-20
RECORD_1003 2024-02-01 2024-02-10
RECORD_1004 2024-02-15 2024-02-20
RECORD_1005 2024-03-01 2024-03-10
RECORD_1006 2024-03-15 2024-03-20
RECORD_1007 2024-04-01 2024-04-10
RECORD_1008 2024-04-15 2024-04-20
RECORD_1009 2024-05-01 2024-05-10
RECORD_1010 2024-05-15 2024-05-20

>>> df2.head(10)
            start_date   end_date
record_id
RECORD_1001 2024-01-01 2024-01-10
RECORD_1002 2024-01-15 2024-01-20
RECORD_1003 2024-02-01 2024-02-10
RECORD_1004 2024-02-15 2024-02-20
RECORD_1005 2024-03-01 2024-03-10
RECORD_1006 2024-03-15 2024-03-20
RECORD_1007 2024-04-01 2024-04-10
RECORD_1008 2024-04-15 2024-04-20
RECORD_1009 2024-05-01 2024-05-10
RECORD_1010 2024-05-15 2024-05-20
```

### Does this PR introduce _any_ user-facing change?

No API changes, but the note will be added to user-facing documentation.

<img width="770" alt="Screenshot 2025-02-26 at 5 02 18 PM" src="https://github.com/user-attachments/assets/fbd351a7-1646-429e-98cf-69df02933957" />

### How was this patch tested?

Manually tested, and also the existing CI should pass.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50086 from itholic/SPARK-51314.

Authored-by: Haejoon Lee <haejoon.lee@databricks.com>
Signed-off-by: Haejoon Lee <haejoon.lee@databricks.com>
(cherry picked from commit f71291b17a92ab1788f3a00166a024374075b5e3)
Signed-off-by: Haejoon Lee <haejoon.lee@databricks.com> (by Haejoon Lee on 2025-03-05T00:48:37Z)
- 659a2f9: [SPARK-51383][PYTHON][CONNECT] Avoid making RPC calls if clients are already known as stopped

### What changes were proposed in this pull request?

This PR is sort of a followup of https://github.com/apache/spark/pull/40536 that fails fast if clients are already known as stopped.

### Why are the changes needed?

To avoid overhead of making RPC calls when the clients are closed. Failing fast.

### Does this PR introduce _any_ user-facing change?

No. Internal changes.

### How was this patch tested?

Existing tests added in https://github.com/apache/spark/pull/40536

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50145 from HyukjinKwon/SPARK-51383.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 31cf3c3752570d964e3ce13d8e3629fd263264c9)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-05T01:28:32Z)
- 59e6598: Revert "[SPARK-51276][PYTHON] Enable spark.sql.execution.arrow.pyspark.enabled by default"

This reverts commit e4cfb644d181ed55bcbe5d9e50843f42d13e3cf0. (by Hyukjin Kwon on 2025-03-05T02:08:04Z)
- 71c91cc: Revert "[SPARK-48516][PYTHON][FOLLOW-UP] Add a note in migration guide about Arrow-optimized Python UDF enabled by default"

This reverts commit 45900c434c9ae275e9394a6fa0936a34a8bf3f3b. (by Hyukjin Kwon on 2025-03-05T02:11:06Z)
- 4be2641: Revert "[SPARK-48516][PYTHON][CONNECT] Turn on Arrow optimization for Python UDFs by default"

This reverts commit 2de9be2d561b5193136e9e7dbdccacf647cead5c. (by Hyukjin Kwon on 2025-03-05T02:12:52Z)
- e331d7a: [SPARK-51390][INFRA] Add more dependencies in LICENSE-binary for Spark 4.0.0 release

### What changes were proposed in this pull request?

While reviewing Spark 4.0.0 RC2, I noticed the binary distribution included several jars that were not covered in the license file. This change covers all of the missing dependencies that I found.

Additionally, I have corrected a minor syntax problem regarding HikariCP, using the ':' delimiter to separate group from artifact ID.

### Why are the changes needed?

Provide complete license information on bundled dependencies in binary distributions for the 4.0.0 release.

### Does this PR introduce _any_ user-facing change?

Yes. These changes will be visible in the license file of the binary distribution. There is no change in functionality.

### How was this patch tested?

Existing tests

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50158 from cnauroth/SPARK-51390.

Authored-by: Chris Nauroth <cnauroth@apache.org>
Signed-off-by: Kent Yao <yao@apache.org>
(cherry picked from commit 4be3aaee7560338468ddf9f24b987c761a9e61d5)
Signed-off-by: Kent Yao <yao@apache.org> (by Chris Nauroth on 2025-03-05T02:24:18Z)
- 342055b: [SPARK-51307][SQL] locationUri in CatalogStorageFormat shall be decoded for display

### What changes were proposed in this pull request?

This PR uses CatalogUtils.URIToString instead of URI.toString to decode the location URI.

### Why are the changes needed?

For example, for partition specs like test1=X'16', test3=timestamp'2018-11-17 13:33:33', the stored path will include them as `test1=%16/test3=2018-11-17 13%3A33%3A33` because the special characters are escaped. Furthermore, while resolving the whole path string to a URI object, this path fragment becomes `test1=%2516/test3=2018-11-17 13%253A33%253A33`, so we need to decode `%25` -> `%` before displaying to users

### Does this PR introduce _any_ user-facing change?
yes, DESC TABLE  will not show 2x-encoded paths.

### How was this patch tested?
new tests

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50074 from yaooqinn/SPARK-51307.

Authored-by: Kent Yao <yao@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit eb7144396286f012317647c8979ee0e6e5f75868)
Signed-off-by: Kent Yao <yao@apache.org> (by Kent Yao on 2025-03-04T18:24:41Z)
- 7e68681: [MINOR] Remove unused imports

### What changes were proposed in this pull request?

This PR removes unused imports. There was a conflict with the revert https://github.com/apache/spark/commit/eb4855315049d2e8ab0105efbbd1a00f8c01aadb and https://github.com/apache/spark/commit/9efaa91deb502cadbaddb8ca4c934bd8529aeaad

### Why are the changes needed?

To recover the CI

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Manually

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50162 from HyukjinKwon/hotfix.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 12f29675735c1e6025bf01d07ab843ed47407c09)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-05T02:41:48Z)
- 62692d6: [SPARK-51277][PYTHON][FOLLOW-UP] Remove 0-arg check in Spark Connect side as well

### What changes were proposed in this pull request?

This PR is a followup of https://github.com/apache/spark/commit/9efaa91deb502cadbaddb8ca4c934bd8529aeaad that removes the 0-arg check in Spark Connect side as well.

### Why are the changes needed?

To allow 0-arg support with Arrow-optimized Python UDFs as well.

### Does this PR introduce _any_ user-facing change?

No, the main change has not been released out yet.

### How was this patch tested?

Existing test cases.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50163 from HyukjinKwon/SPARK-51277-followup.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 7fca7aeaf9a4fd6a84141a0f113936b389f5394e)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-05T04:27:17Z)
- 1cfbe46: [SPARK-51357][SQL] Preserve plan change logging level for views

### What changes were proposed in this pull request?

Preserve plan change logging level for views:
- `spark.sql.planChangeLog.level`
- `spark.sql.expressionTreeChangeLog.level`

Before:

![image](https://github.com/user-attachments/assets/bf9f5804-1561-499a-9ba6-6d88e9b16aea)

After:

![image](https://github.com/user-attachments/assets/f076784a-bae1-4626-8a46-a8e1b3078c01)

### Why are the changes needed?

Plan change logging level is not preserved for views. This hides part of the resolution process for queries with views and makes debugging harder.

### Does this PR introduce _any_ user-facing change?

No, just debugging becomes easier.

### How was this patch tested?

Existing tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50118 from vladimirg-db/vladimir-golubev_data/preserve-plan-change-logging-setting-for-views.

Authored-by: Vladimir Golubev <vladimir.golubev@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit a6600afbcba1dec251e7c751c7bd463b9e9ee35d)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Vladimir Golubev on 2025-03-05T05:16:48Z)
- ebd27c1: [SPARK-51388][SQL] Improve SQL fragment propagation in to_timestamp and UNION

### What changes were proposed in this pull request?

Improve SQL fragment propagation in to_timestamp and UNION.

### Why are the changes needed?

To improve error messages:
![image](https://github.com/user-attachments/assets/4952ce49-5a29-4bf7-9d9f-0e443b1127ec)

### Does this PR introduce _any_ user-facing change?

Invalid `Cast` error messages become better.

### How was this patch tested?

Golden file tests are regenerated.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50154 from vladimirg-db/vladimir-golubev_data/improve-sql-fragment-in-some-places.

Authored-by: Vladimir Golubev <vladimir.golubev@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 4b4bdcfe1fe9bfd38030b855139a12fc55034083)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Vladimir Golubev on 2025-03-05T09:19:26Z)
- e7165ae: [SPARK-49507][SQL] Fix the case issue after enabling metastorePartitionPruningFastFallback

### What changes were proposed in this pull request?

This PR enhances the partition predicate handling in the `HiveShim` by ensuring that partition schema and predicates are properly transformed to lowercase. This change improves compatibility when generating partition predicates for filtering.

How to reproduce:
```
CREATE TABLE t (ID BIGINT, DT STRING) USING parquet PARTITIONED BY (DT);
set spark.sql.hive.metastorePartitionPruningFastFallback=true;
select * from t where dt=20240820;
```
Error message:
```
org.apache.spark.sql.AnalysisException: Expected only partition pruning predicates: List(isnotnull(DT#21), (cast(DT#21 as bigint) = 20240820)).
  at org.apache.spark.sql.errors.QueryCompilationErrors$.nonPartitionPruningPredicatesNotExpectedError(QueryCompilationErrors.scala:2414)
  at org.apache.spark.sql.catalyst.catalog.ExternalCatalogUtils$.generatePartitionPredicateByFilter(ExternalCatalo
```

### Why are the changes needed?

Bug fix.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Unit test.

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #47998 from TongWei1105/SPARK-49507.

Authored-by: TongWei1105 <vvtwow@gmail.com>
Signed-off-by: Yuming Wang <yumwang@ebay.com>
(cherry picked from commit 60521214de1a39ef774c6b8aaec14b400c6722b5)
Signed-off-by: Yuming Wang <yumwang@ebay.com> (by TongWei1105 on 2025-03-05T13:57:39Z)
- 7802529: [SPARK-51401][SQL] Change `ExplainUtils.generateFieldString` to directly call `QueryPlan.generateFieldString`

### What changes were proposed in this pull request?
This pr change `ExplainUtils.generateFieldString` to directly call `QueryPlan.generateFieldString` because these are identical methods.

https://github.com/apache/spark/blob/4b4bdcfe1fe9bfd38030b855139a12fc55034083/sql/core/src/main/scala/org/apache/spark/sql/execution/ExplainUtils.scala#L300-L307

https://github.com/apache/spark/blob/4b4bdcfe1fe9bfd38030b855139a12fc55034083/sql/catalyst/src/main/scala/org/apache/spark/sql/catalyst/plans/QueryPlan.scala#L789-L795

Meanwhile, this is a TODO left by nemanjapetr-db  in SPARK-50739.

### Why are the changes needed?
Remove duplicated code.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Pass Github Actions

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50169 from LuciferYang/SPARK-51401.

Authored-by: yangjie01 <yangjie01@baidu.com>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit cdba396d6e9b23dea05b7462e21c0c82a493e7f3)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by yangjie01 on 2025-03-05T16:30:06Z)
- 4e222ed: [SPARK-51407][CONNECT][DOCS] Document missed `Spark Connect` configurations

### What changes were proposed in this pull request?

This PR aims to documents the missed `spark.connect.*` configurations by syncing.

- sql/connect/server/src/main/scala/org/apache/spark/sql/connect/config/Connect.scala
- docs/configuration.md

### Why are the changes needed?

**Apache Spark 3.5.0**
- spark.connect.jvmStacktrace.maxSize
- spark.sql.connect.ui.retainedSessions
- spark.sql.connect.ui.retainedStatements

**Apache Spark 4.0.0**
- spark.connect.grpc.binding.address
- spark.connect.grpc.port.maxRetries
- spark.connect.ml.backend.classes
- spark.sql.connect.enrichError.enabled
- spark.sql.connect.serverStacktrace.enabled
- spark.connect.grpc.maxMetadataSize
- spark.connect.progress.reportInterval

### Does this PR introduce _any_ user-facing change?

This updates only a config documentation and `configuration` HTML page.

### How was this patch tested?

Manual review.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50171 from dongjoon-hyun/SPARK-51407.

Authored-by: Dongjoon Hyun <dongjoon@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 22f1905c87fdbecd89e6cf64fbfaaa49cfbaa509)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Dongjoon Hyun on 2025-03-05T22:44:59Z)
- f6fb8fb: [SPARK-51407][DOCS][FOLLOWUP] Fix `spark.connect.ml.backend.classes` description

### What changes were proposed in this pull request?

This is a follow-up to fix a documentation to switch table columns of `spark.connect.ml.backend.classes` configuration description.

### Why are the changes needed?

**AFTER**
<img width="921" alt="Screenshot 2025-03-05 at 15 47 54" src="https://github.com/user-attachments/assets/e647d2b5-9671-4243-986a-e649e4c42ffc" />

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

```
$ cd docs
$ bundle install
$ SKIP_API=1 bundle exec jekyll build
```

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50175 from dongjoon-hyun/SPARK-51407-2.

Authored-by: Dongjoon Hyun <dongjoon@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 46b285e81d30a3f8a298b3b78f8c2b72ead33285)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Dongjoon Hyun on 2025-03-06T00:46:20Z)
- 66ed4e3: [SPARK-51393][PYTHON] Fallback to regular Python UDF when Arrow is not found but Arrow-optimized Python UDFs enabled

### What changes were proposed in this pull request?

This PR extracts legitimate improvement in https://github.com/apache/spark/pull/49482. Falls back regular Python UDF when Arrow is not found but Arrow-optimized Python UDFs enabled.

### Why are the changes needed?

To minimize end user impact.

### Does this PR introduce _any_ user-facing change?

Yes, it falls back to regular Python UDF when Arrow is not found but Arrow-optimized Python UDFs enabled.

### How was this patch tested?

Manually tested.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50160 from HyukjinKwon/SPARK-51393.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 74293cc11200c86e29417186e376ab7d9c211dec)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-06T01:05:21Z)
- f629491: [SPARK-51097][SS][4.0] Revert RocksDB instance metrics changes

### What changes were proposed in this pull request?

SPARK-51097

Similar to #50161, this PR reverts the changes in branch-4.0 introduced from SPARK-51097. More specifically, this reverts the following commit: https://github.com/apache/spark/commit/55fc6f5f3028c35fa7564e45daa7c0e3d4d456f9

The context of this issue is that the newly introduced instance metrics have been unexpectedly showing up in Spark UI regardless of whether they are being used or not by the state stores. As a result, a query using 500 shuffle partitions would result in 500 instance metrics showing up in Spark UI (specifically, the SQL tab visualizing execution plan).

The original PR from #49816 introduced a new type of SQL metrics denoting metrics for specific state store instances. This change only targeted RocksDB state stores.

### Why are the changes needed?

This change is needed to revert an issue with the new instance metrics, where unused metrics would also show up on the Spark UI page. As a result, there would be hundreds of instance metrics showing up on the query visualizer.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Re-verified that RocksDBStateStoreIntegrationSuite is passing

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50165 from zecookiez/SPARK-51097-revert-4.0.

Authored-by: Zeyu Chen <zycm03@gmail.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Zeyu Chen on 2025-03-06T02:48:23Z)
- aa34417: [SPARK-49488][SQL][FOLLOWUP] Use correct MySQL datetime functions when pushing down EXTRACT

### What changes were proposed in this pull request?
This PR proposes to use correct MySQL datetime functions when pushing down `EXTRACT`.

### Why are the changes needed?
bug fix

### Does this PR introduce _any_ user-facing change?
Yes, query result is corrected, but this bug is not released yet.

### How was this patch tested?
updated test

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50112 from beliefer/SPARK-49488_followup.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 7b39d2409dc6031caef98c84edf21945b3a6cb41)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by beliefer on 2025-03-06T06:24:01Z)
- 2ab426a: [SPARK-51408][YARN][TESTS] AmIpFilterSuite#testProxyUpdate fails in some networks

### What changes were proposed in this pull request?

While verifying Spark 4.0.0 RC2, I consistently saw YARN test `AmIpFilterSuite#testProxyUpdate` failing in my environment. The test is written to eventually expect a `ServletException` from `getProxyAddresses` after 5 seconds of retries, but I never received this exception.

This test and the corresponding `AmIpFilter` were introduced in [SPARK-48238](https://issues.apache.org/jira/browse/SPARK-48238) as a fork of the Hadoop implementation to resolve a dependency conflict. However, it seems this test had a small bug in the way it was adapted into the Spark codebase. The `AmIpFilter#getProxyAddresses()` logic may either return an empty set or throw a `ServletException` if it can't find any valid configured proxies. The Hadoop test's assertion allows for either of these conditions:

https://github.com/apache/hadoop/blob/rel/release-3.4.0/hadoop-yarn-project/hadoop-yarn/hadoop-yarn-server/hadoop-yarn-server-web-proxy/src/test/java/org/apache/hadoop/yarn/server/webproxy/amfilter/TestAmFilter.java#L212-L222

```
    // waiting for configuration update
    GenericTestUtils.waitFor(new Supplier<Boolean>() {
      Override
      public Boolean get() {
        try {
          return filter.getProxyAddresses().isEmpty();
        } catch (ServletException e) {
          return true;
        }
      }
    }, 500, updateInterval);
```

The version in Spark strictly requires an exception to be thrown:

https://github.com/apache/spark/blob/v4.0.0-rc2/resource-managers/yarn/src/test/scala/org/apache/spark/deploy/yarn/AmIpFilterSuite.scala#L163-L168

```
    // waiting for configuration update
    eventually(timeout(5.seconds), interval(500.millis)) {
      assertThrows[ServletException] {
        filter.getProxyAddresses.isEmpty
      }
    }
```

The test involves updating the proxy configuration to use "unknownhost" as an invalid proxy. In my network, there is actually a host named "unknownhost", but it only has an IPv6 address, and I only have an IPv4 address. This causes a "network unreachable" error instead of "unknown host", resulting in an empty set instead of an exception.

This pull request changes the Spark test to be consistent with the Hadoop test, allowing either condition to succeed.

### Why are the changes needed?

Maintain consistency with the intent of the original Hadoop test and ensure it can pass in any network setup.

### Does this PR introduce _any_ user-facing change?

No. The changes are in tests only.

### How was this patch tested?

Existing tests pass in my environment after this change.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50173 from cnauroth/SPARK-51408.

Authored-by: Chris Nauroth <cnauroth@apache.org>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 69d8ece27b4f384590d8a137832aa6c4fec1d57f)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by Chris Nauroth on 2025-03-06T08:21:39Z)
- 1a8d622: [SPARK-51391][SQL][CONNECT] Fix `SparkConnectClient` to respect `SPARK_USER` and `user.name`

### What changes were proposed in this pull request?

This PR aims to fix `SparkConnectClient` to respect `SPARK_USER` and `user.name` for the feature parity with PySpark Connect client.

**BEFORE**
<img width="699" alt="Screenshot 2025-03-04 at 17 04 21" src="https://github.com/user-attachments/assets/19c95b89-0312-47f0-9285-2c824a3a077c" />

**AFTER**
<img width="698" alt="Screenshot 2025-03-04 at 17 05 04" src="https://github.com/user-attachments/assets/49f4dbc3-5e9a-46d4-9825-01e4e1f0cab6" />

### Why are the changes needed?

Like `pyspark`, `spark-shell` and `spark-connect-shell` should have a consistent default user when `--user_id` is not given.

```
$ bin/pyspark --remote sc://localhost:15002
>>> spark.version
'4.0.0'

// Spark Connect Server shows `userId: dongjoon`.
25/03/04 16:57:53 INFO SessionHolder: Session with userId: dongjoon and sessionId: 1fd1bc8f-233b-4a6b-9924-9f90af15f894 accessed,time 1741136273692 ms.
```

```
$ bin/spark-shell --remote sc://localhost:15002

// Spark Connect Server shows `userId: `.
25/03/04 16:58:54 INFO SessionHolder: Session with userId:  and sessionId: 00f7ac26-98c4-49ca-a027-5808e9e5b155 accessed,time 1741136334546 ms.
```

```
$ bin/spark-connect-shell --remote sc://localhost:15002

// Spark Connect Server shows `userId: `.
25/03/04 16:59:29 INFO SessionHolder: Session with userId:  and sessionId: 63afa7dd-8b95-41da-b90e-cd73918b33be accessed,time 1741136369060 ms.
```

### Does this PR introduce _any_ user-facing change?

Yes, this is a bug fix for feature parity across `Spark Connect` languages.

**BEFORE (Apache Spark 4.0.0 RC2)**
```
$ bin/spark-shell --remote sc://localhost:15002

// Spark Connect Server shows `userId: `.
25/03/04 17:01:03 INFO SessionHolder: Session with userId:  and sessionId: b9c7edd7-2209-4c53-b7b1-dfc3171d012a accessed,time 1741136463337 ms.
```

**AFTER**
```
$ bin/spark-shell --remote sc://localhost:15002

// Spark Connect Server shows `userId: dongjoon`.
25/03/04 17:01:35 INFO SessionHolder: Session with userId: dongjoon and sessionId: 3a9305ff-4dbf-4240-b3fd-edb8f3edab02 accessed,time 1741136495807 ms.
```

```
$ SPARK_USER=spark2005 bin/spark-shell --remote sc://localhost:15002

// Spark Connect Server shows `userId: spark2005 `.
25/03/04 17:02:24 INFO SessionHolder: Session with userId: spark2005 and sessionId: 72142325-94d8-4f67-a777-1ede6e02bbf3 accessed,time 1741136544444 ms.
```

### How was this patch tested?

Pass the CIs and manual review.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50159 from dongjoon-hyun/SPARK-51391.

Authored-by: Dongjoon Hyun <dongjoon@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit e821b774d65945aedb087f10fb884d700b88cfc8)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Dongjoon Hyun on 2025-03-06T18:38:54Z)
- 463ab0a: [SPARK-51424][BUILD] Upgrade ORC to 2.1.1

### What changes were proposed in this pull request?

This PR aims to upgrade ORC to 2.1.1.

### Why are the changes needed?

To use the most recent version.
- https://orc.apache.org/news/2025/03/06/ORC-2.1.1/
- https://github.com/apache/orc/releases/tag/v2.1.1

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Pass the CIs.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50189 from dongjoon-hyun/SPARK-51424.

Authored-by: Dongjoon Hyun <dongjoon@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 24c51a232d97d76aed9744dd2b0a3d8c39c848ca)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Dongjoon Hyun on 2025-03-06T19:27:40Z)
- b824dfe: [SPARK-51416][CONNECT] Remove SPARK_CONNECT_MODE when starting Spark Connect server

### What changes were proposed in this pull request?

This PR proposes to remove `SPARK_CONNECT_MODE` environment variable when starting Spark Connect server. So SparkSubmit thinks no remote is set in order to start the regular session.

### Why are the changes needed?

To make Spark Connect version of distribution works with `bin/pyspark`. Currently it fails as below:

```

py4j.protocol.Py4JJavaError: An error occurred while calling None.org.apache.spark.api.java.JavaSparkContext.
: java.lang.ClassNotFoundException: org.apache.spark.sql.connect.SparkConnectPlugin
	at java.base/java.net.URLClassLoader.findClass(URLClassLoader.java:445)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:592)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:525)
	at java.base/java.lang.Class.forName0(Native Method)
	at java.base/java.lang.Class.forName(Class.java:467)
	at org.apache.spark.util.SparkClassUtils.classForName(SparkClassUtils.scala:41)
	at org.apache.spark.util.SparkClassUtils.classForName$(SparkClassUtils.scala:36)
	at org.apache.spark.util.Utils$.classForName(Utils.scala:99)
	at org.apache.spark.util.Utils$.$anonfun$loadExtensions$1(Utils.scala:2828)
	at scala.collection.StrictOptimizedIterableOps.flatMap(StrictOptimizedIterableOps.scala:118)
	at scala.collection.StrictOptimizedIterableOps.flatMap$(StrictOptimizedIterableOps.scala:105)
	at scala.collection.immutable.ArraySeq.flatMap(ArraySeq.scala:35)
	at org.apache.spark.util.Utils$.loadExtensions(Utils.scala:2826)
	at org.apache.spark.internal.plugin.PluginContainer$.apply(PluginContainer.scala:210)
	at org.apache.spark.internal.plugin.PluginContainer$.apply(PluginContainer.scala:196)
	at org.apache.spark.SparkContext.<init>(SparkContext.scala:588)
	at org.apache.spark.api.java.JavaSparkContext.<init>(JavaSparkContext.scala:59)
	at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
	at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:77)
	at java.base/jdk.internal.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
	at java.base/java.lang.reflect.Constructor.newInstanceWithCaller(Constructor.java:500)
	at java.base/java.lang.reflect.Constructor.newInstance(Constructor.java:481)
	at py4j.reflection.MethodInvoker.invoke(MethodInvoker.java:247)
	at py4j.reflection.ReflectionEngine.invoke(ReflectionEngine.java:374)
	at py4j.Gateway.invoke(Gateway.java:238)
	at py4j.commands.ConstructorCommand.invokeConstructor(ConstructorCommand.java:80)
	at py4j.commands.ConstructorCommand.execute(ConstructorCommand.java:69)
	at py4j.ClientServerConnection.waitForCommands(ClientServerConnection.java:184)
	at py4j.ClientServerConnection.run(ClientServerConnection.java:108)
	at java.base/java.lang.Thread.run(Thread.java:840)
```

`bin/spark-shell` also fails due to the same reason.

### Does this PR introduce _any_ user-facing change?

No, the main change has not been released yet.

### How was this patch tested?

Manually with:

```
SPARK_CONNECT_MODE=1 ./bin/pyspark
SPARK_CONNECT_MODE=1 ./bin/spark-shell
```

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50180 from HyukjinKwon/SPARK-51416.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit e4cc116791dc3b8c8dfcd9421867e7ddb8f12e70)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-06T23:08:50Z)
- 35846dc: [MINOR][DOCS] Fix small grammatical nit

### What changes were proposed in this pull request?
A very minor grammatical nit.

### Why are the changes needed?
To fix a very minor grammatical nit introduced while taking care of https://github.com/apache/spark/pull/50086

### Does this PR introduce _any_ user-facing change?
Yes, docs change.

### How was this patch tested?
Manual verification.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50196 from the-sakthi/minor-doc-fix.

Authored-by: Sakthi Vel <sakthi@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 33d3e5bd4b76366f9cd13408aa38ebe9780da46f)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Sakthi Vel on 2025-03-06T23:32:55Z)
- 96d1b28: [SPARK-51417][CONNECT] Give a second to wait for Spark Connect server to fully start

### What changes were proposed in this pull request?

This PR is a folllowup of https://github.com/apache/spark/pull/50039 that gives a second to remove retrying logs.

### Why are the changes needed?

To remove retrying logs.

### Does this PR introduce _any_ user-facing change?

No the main change has not been released yet.

### How was this patch tested?

Manually.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50181 from HyukjinKwon/SPARK-51417.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 772ac22f6ea1ca3e00775e1e036b1b34159275e8)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-07T00:51:24Z)
- 7b884c2: [SPARK-50511][PYTHON][FOLLOWUP] Avoid wrapping streaming Python data source error messages

### What changes were proposed in this pull request?

This PR is a follow up for https://github.com/apache/spark/pull/49092. It removes the extra try catch during streaming Python data source execution.

### Why are the changes needed?

To make the error message more user-friendly and avoid nested error messages:
```
error1
During handling of the above exception, another exception occurred:
error2
```

### Does this PR introduce _any_ user-facing change?

no

### How was this patch tested?

existing tests

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #49532 from allisonwang-db/spark-50511-streaming-pyds-err.

Authored-by: Allison Wang <allison.wang@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit c0ec84e1b5b861d7aed2dc89c2f3ccd83dfdf882)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Allison Wang on 2025-03-07T01:11:33Z)
- bb5a15a: [SPARK-47849][PYTHON][CONNECT] Change release script to release pyspark-client

### What changes were proposed in this pull request?

This PR proposes to change release script to publish `pyspark-client`.

### Why are the changes needed?

We should have the release available in PyPI.

### Does this PR introduce _any_ user-facing change?

Yes, it releases `pyspark-client` package into PyPI.

### How was this patch tested?

Did the basic test for individual commands. This is similar with https://github.com/apache/spark/pull/46049

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50203 from HyukjinKwon/SPARK-51433.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 2f331e0d2a4d28318bff151bc27b1fa8fdf05fd2)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-07T06:19:17Z)
- ba72a04: [SPARK-49479][CORE] Cancel the Timer non-daemon thread on stopping the BarrierCoordinator

### What changes were proposed in this pull request?
There are couple of changes proposed as part of this PR
1. Change the non-deamon timer thread to a daemon thread so that the JVM exits on Spark Application End
2. Use `Futures.cancel(true)` api to cancel the `timerTasks`

### Why are the changes needed?
In Barrier Execution Mode, Spark driver JVM could hang around after calling spark.stop(). Although the Spark Context was shutdown, the JVM was still running.
The reason was that there is a non-daemon timer thread named `BarrierCoordinator barrier epoch increment timer`, which prevented the driver JVM from stopping.
In [SPARK-46895](https://issues.apache.org/jira/browse/SPARK-46895) the `Timer` class was changed to `ScheduledThreadPoolExecutor` but the corresponding methods such as `timer.cancel` were not changed which made the logic no-op as explained [here](https://github.com/apache/spark/pull/47956#issuecomment-2328035086)

### Does this PR introduce any user-facing change?
No

### How was this patch tested?
- Run the following scripts locally using `spark-submit`.
- Without this change, the JVM would hang there and not exit.
- With this change it would exit successfully.

**_Code samples to simulate the problem and the corresponding fix is attached below:-_**

[barrier_example.py](https://gist.github.com/jshmchenxi/5d7e7c61e1eedd03cd6d676699059e9b#file-barrier_example-py)
[xgboost-test.py](https://gist.github.com/bcheena/510230e19120eb9ae631dcafa804409f).

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50020 from jjayadeep06/master.

Authored-by: jjayadeep06 <jayadeep.jayaraman@gmail.com>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit 940a62c3f36a54128fb8d74df2d1a41055ca6a28)
Signed-off-by: beliefer <beliefer@163.com> (by jjayadeep06 on 2025-03-07T07:16:58Z)
- f8c1fa3: [MINOR][SQL] Slightly refactor and optimize illegaility check in Recursive CTE Subqueries

### What changes were proposed in this pull request?

Change the place where we check whether there is a recursive CTE within a subquery. Also, change implementation to be instead of collecting all subqueries into one array, we do an in-place traversal of everything to check.

### Why are the changes needed?

It's more efficient to do in-place traversal instead of collecting subqueries to an array and traverse, so this change is a small optimization.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Will be tested in [49955](https://github.com/apache/spark/pull/49955).

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50208 from Pajaraja/pavle-martinovic_data/SmallOptimizeToCTERefIllegal.

Authored-by: pavle-martinovic_data <pavle.martinovic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 93675c6715b315b2c1e05bf1193ab11c918a34f5)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by pavle-martinovic_data on 2025-03-07T12:58:07Z)
- 7ccd4eb: [SPARK-51364][SQL][TESTS] Improve the integration tests for external data source by check filter pushed down

### What changes were proposed in this pull request?
This PR proposes to improve the integration tests for external data source by check filter pushed down.

### Why are the changes needed?
The integration tests have many test cases not check the filter whether or not pushed down.

### Does this PR introduce _any_ user-facing change?
'No'.
Just update test cases.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50126 from beliefer/SPARK-51364.

Authored-by: beliefer <beliefer@163.com>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 50e8d68d92145fc3233d4c1e17848bcc73c3352e)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by beliefer on 2025-03-07T18:53:29Z)
- 8e27e83: [SPARK-51365][SQL][TESTS] Add Envs to control the number of `SHUFFLE_EXCHANGE/RESULT_QUERY_STAGE` threads used in test cases related to `SharedSparkSession/TestHive`

### What changes were proposed in this pull request?
This PR adds the following environment variables:

- `SPARK_TEST_SQL_SHUFFLE_EXCHANGE_MAX_THREAD_THRESHOLD`: Used to control the `SHUFFLE_EXCHANGE_MAX_THREAD_THRESHOLD` for test cases related to `SharedSparkSession`.
- `SPARK_TEST_SQL_RESULT_QUERY_STAGE_MAX_THREAD_THRESHOLD`: Used to control the `RESULT_QUERY_STAGE_MAX_THREAD_THRESHOLD` for test cases related to `SharedSparkSession`.
- `SPARK_TEST_HIVE_SHUFFLE_EXCHANGE_MAX_THREAD_THRESHOLD`: Used to control the `SHUFFLE_EXCHANGE_MAX_THREAD_THRESHOLD` for test cases related to `TestHive`.
- `SPARK_TEST_HIVE_RESULT_QUERY_STAGE_MAX_THREAD_THRESHOLD`: Used to control the `RESULT_QUERY_STAGE_MAX_THREAD_THRESHOLD` for test cases related to `TestHive`.

This allows the maximum number of `SHUFFLE_EXCHANGE`/`RESULT_QUERY_STAGE` threads used in test cases related to `SharedSparkSession`/`TestHive` to be controlled by setting environment variables.

Additionally, due to the memory configuration of the macOS + Apple Silicon runner specification in the standard GitHub-hosted runners being only half of that of other specifications (7G vs 14G), this pr configures the following settings in `build_maven_java21_macos15.yml`:

```
"SPARK_TEST_SQL_SHUFFLE_EXCHANGE_MAX_THREAD_THRESHOLD": "256",
"SPARK_TEST_SQL_RESULT_QUERY_STAGE_MAX_THREAD_THRESHOLD": "256",
"SPARK_TEST_HIVE_SHUFFLE_EXCHANGE_MAX_THREAD_THRESHOLD": "48",
"SPARK_TEST_HIVE_RESULT_QUERY_STAGE_MAX_THREAD_THRESHOLD": "48"
```

This is to avoid test errors similar to the following from occurring in daily tests on macOS:

```
Warning: [343.044s][warning][os,thread] Failed to start thread "Unknown thread" - pthread_create failed (EAGAIN) for attributes: stacksize: 4096k, guardsize: 16k, detached.
11372Warning: [343.044s][warning][os,thread] Failed to start the native thread for java.lang.Thread "shuffle-exchange-1529"
11373*** RUN ABORTED ***
11374An exception or error caused a run to abort: unable to create native thread: possibly out of memory or process/resource limits reached
11375  java.lang.OutOfMemoryError: unable to create native thread: possibly out of memory or process/resource limits reached
11376  at java.base/java.lang.Thread.start0(Native Method)
11377  at java.base/java.lang.Thread.start(Thread.java:1553)
11378  at java.base/java.lang.System$2.start(System.java:2577)
11379  at java.base/jdk.internal.vm.SharedThreadContainer.start(SharedThreadContainer.java:152)
11380  at java.base/java.util.concurrent.ThreadPoolExecutor.addWorker(ThreadPoolExecutor.java:953)
11381  at java.base/java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1364)
11382  at scala.concurrent.impl.ExecutionContextImpl.execute(ExecutionContextImpl.scala:21)
11383  at java.base/java.util.concurrent.CompletableFuture.asyncSupplyStage(CompletableFuture.java:1782)
11384  at java.base/java.util.concurrent.CompletableFuture.supplyAsync(CompletableFuture.java:2005)
11385  at org.apache.spark.sql.execution.SQLExecution$.withThreadLocalCaptured(SQLExecution.scala:329)
11386  ...
```

### Why are the changes needed?
The default configuration values for `SHUFFLE_EXCHANGE_MAX_THREAD_THRESHOLD` and `RESULT_QUERY_STAGE_MAX_THREAD_THRESHOLD` are 1024. Additionally, since the `-Xss` value used in Spark test cases is relatively large by default, such as `-Xss4m` for the SQL module and `-Xss64m` for the Hive module, it is necessary to provide the ability to adjust the maximum number of related threads to accommodate different test environments, such as the daily tests on macOS.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
- Pass Github Actions
- Test macOs on Github Action: https://github.com/LuciferYang/spark/actions/runs/13745222147

![image](https://github.com/user-attachments/assets/b7dc09bd-4450-4272-aa01-e64013c8aab4)

### Was this patch authored or co-authored using generative AI tooling?
NO

Closes #50206 from LuciferYang/SPARK-51365.

Lead-authored-by: yangjie01 <yangjie01@baidu.com>
Co-authored-by: YangJie <yangjie01@baidu.com>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit 34c29cf9fb95ee90a19fab72c5f0d433b9d30a40)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by yangjie01 on 2025-03-10T03:03:57Z)
- c1d0aed: [SPARK-51418][SQL] Fix DataSource PARTITON TABLE w/ Hive type incompatible partition columns

### What changes were proposed in this pull request?

```
25/03/06 08:25:17 WARN HiveExternalCatalog: Hive incompatible types found: timestamp_ntz. Persisting data source table `spark_catalog`.`default`.`c` into Hive metastore in Spark SQL specific format, which is NOT compatible with Hive.
org.apache.spark.sql.AnalysisException: org.apache.hadoop.hive.ql.metadata.HiveException: InvalidObjectException(message:Invalid partition column type: timestamp_ntz)
```

The partition columns are duplicated and stored both in the HMS column meta and the table properties. If they contain incompatible data types, the HMS Meta API will fail the process.

We can rely on the table properties to read/write

### Why are the changes needed?
bugfix, otherwise, newly added spark data types are not able to be used as partition columns

### Does this PR introduce _any_ user-facing change?
Yes, More type cases are supported for partitioned datasouce tables stored in HMS

### How was this patch tested?
new tests

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50182 from yaooqinn/SPARK-51418.

Authored-by: Kent Yao <yao@apache.org>
Signed-off-by: Kent Yao <yao@apache.org>
(cherry picked from commit f11bc758bafc23c1f9eaf89320c5765ac3a24eac)
Signed-off-by: Kent Yao <yao@apache.org> (by Kent Yao on 2025-03-10T05:30:43Z)
- d5bcdd4: [SPARK-51269][SQL] Simplify AvroCompressionCodec by removing defaultCompressionLevel

### What changes were proposed in this pull request?
This PR proposes to let SQLConf manage the default value for avro compression level.

### Why are the changes needed?
Currently, the default value of `spark.sql.avro.deflate.level` is -1. But it managed with the enum `AvroCompressionCodec`.
The document of the config item `spark.sql.avro.deflate.level` contains the description `The default value is -1 which corresponds to 6 level in the current implementation.` So the users get the knowledge that it has the default value -1.
If some developer use the config item in mistake, there is no guarantee for the default value. And then causes some unpredictable behavior and make users confused.
I think we should keep the default value within `SQLConf` in safety.

Some other config item has the same confusion, `spark.sql.avro.xz.level` and `spark.sql.avro.zstandard.level`.

### Does this PR introduce _any_ user-facing change?
'No'.
New feature.

### How was this patch tested?
GA.

### Was this patch authored or co-authored using generative AI tooling?
'No'.

Closes #50021 from beliefer/SPARK-51269.

Lead-authored-by: beliefer <beliefer@163.com>
Co-authored-by: Kent Yao <yao@apache.org>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit ef4cd39a03136cee2a3d6dff24cf5f893f69822a)
Signed-off-by: beliefer <beliefer@163.com> (by beliefer on 2025-03-10T13:05:52Z)
- 6e6e425: [SPARK-51468][SQL] Revert "From json/xml should not change collations in the given schema"

### What changes were proposed in this pull request?
After removing session-level collation (#49772) we can also revert the PR that changed the behavior of `from_json` and `from_xml` expressions to use json and not sql type representation under the hood (#48750).

### Why are the changes needed?
Now that we don't have correctness problems with session level collation, using `sql` instead of `json` will lead to smaller and more efficient type representation.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Existing unit tests.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50234 from stefankandic/revertFromJsonChange.

Authored-by: Stefan Kandic <stefan.kandic@databricks.com>
Signed-off-by: Max Gekk <max.gekk@gmail.com>
(cherry picked from commit 0094f445b2396e97fbb48dfe810fcf65dfdf4828)
Signed-off-by: Max Gekk <max.gekk@gmail.com> (by Stefan Kandic on 2025-03-11T14:17:29Z)
- 90e119c: [SPARK-43221][CORE][4.0] Host local block fetching should use a block status of a block stored on disk

**This is a backport to branch-4.0 from master.**

Thanks for yorksity who reported this error and even provided a PR for it.
This solution very different from https://github.com/apache/spark/pull/40883 as `BlockManagerMasterEndpoint#getLocationsAndStatus()` needed some refactoring.

### What changes were proposed in this pull request?

This PR fixes an error which can be manifested in the following exception:

```
25/02/20 09:58:31 ERROR util.Utils: [Executor task launch worker for task 61.0 in stage 67.0 (TID 9391)]: Exception encountered
java.lang.ArrayIndexOutOfBoundsException: 0
  at org.apache.spark.broadcast.TorrentBroadcast.$anonfun$readBlocks$1(TorrentBroadcast.scala:185) ~[spark-core_2.12-3.3.2.3.3.7190.5-2.jar:3.3.2.3.3.7190.5-2]
  at scala.runtime.java8.JFunction1$mcVI$sp.apply(JFunction1$mcVI$sp.java:23) ~[scala-library-2.12.15.jar:?]
  at scala.collection.immutable.List.foreach(List.scala:431) ~[scala-library-2.12.15.jar:?]
  at org.apache.spark.broadcast.TorrentBroadcast.readBlocks(TorrentBroadcast.scala:171) ~[spark-core_2.12-3.3.2.3.3.7190.5-2.jar:3.3.2.3.3.7190.5-2]
```

The PR is changing `BlockManagerMasterEndpoint#getLocationsAndStatus()`.

The `BlockManagerMasterEndpoint#getLocationsAndStatus()` function is giving back an optional `BlockLocationsAndStatus` which consist of 3 parts:
 - `locations`: all the locations where the block can be found (as a sequence of block manager IDs)
 - `status`: one block status
 - `localDirs`: optional directory paths which can be used to read block if the block is found in the disk of an executor running on the same host

The block (either RDD blocks, shuffle blocks or torrent blocks) can be stored in many executors with different storage levels: disk or memory.

This PR changing how the block status and the block manager ID for the `localDirs` is found to guarantee they belong together.

### Why are the changes needed?

Before this PR the `BlockManagerMasterEndpoint#getLocationsAndStatus()` was searching for the block status (`status`) and the `localDirs` separately. The block status actually was computed as the very first one where the block can be found. This way it can easily happen this block status was representing an in-memory block (where the disk size is 0 as it is stored in the memory) but the `localDirs` was filled out based on a host local block instance which was stored on disk.

This situation can be very frequent but only causing problems (exceptions as above) when encryption is on (spark.io.encryption.enabled=true) as for a not encrypted block the whole file containing the block is read, see
https://github.com/apache/spark/blob/branch-3.5/core/src/main/scala/org/apache/spark/storage/BlockManager.scala#L1244

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Host local block fetching was already covered by some existing unit tests but a new unit test is provided for this exact case: "SPARK-43221: Host local block fetching should use a block status with disk size".

The number of block mangers and the order of the blocks was chosen after some experimentation as the block status order is depends on a `HashSet`, see:
```
  private val blockLocations = new JHashMap[BlockId, mutable.HashSet[BlockManagerId]]
```

This test was executed with the old code too to validate the issue is reproduced:
```
BlockManagerSuite:
OpenJDK 64-Bit Server VM warning: Sharing is only supported for boot loader classes because bootstrap classpath has been appended
- SPARK-43221: Host local block fetching should use a block status with disk size *** FAILED ***
  0 was not greater than 0 The block size must be greater than 0 for a nonempty block! (BlockManagerSuite.scala:491)
Run completed in 6 seconds, 705 milliseconds.
Total number of tests run: 1
Suites: completed 1, aborted 0
Tests: succeeded 0, failed 1, canceled 0, ignored 0, pending 0
*** 1 TEST FAILED ***
```

### Was this patch authored or co-authored using generative AI tooling?

No.

(cherry picked from commit 997e599738ebc3b1e1df6a313cd222bb70ef481d)

Closes #50259 from attilapiros/SPARK-43221_branch-4.0.

Authored-by: attilapiros <piros.attila.zsolt@gmail.com>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by attilapiros on 2025-03-13T00:27:13Z)
- 7f6ac7f: [SPARK-48922][SQL] Avoid redundant array transform of identical expression for map type

### What changes were proposed in this pull request?

Similar to #47843, this patch avoids ArrayTransform in `resolveMapType` function if the resolution expression is the same as input param.

### Why are the changes needed?

My previous pr #47381 was not merged, but I still think it is an optimization, so I reopened it.

During the upgrade from Spark 3.1.1 to 3.5.0, I found a performance regression in map type inserts.

There are some extra conversion expressions in project before insert, which doesn't seem to be always necessary.

```
map_from_arrays(transform(map_keys(map#516), lambdafunction(lambda key#652, lambda key#652, false)), transform(map_values(map#516), lambdafunction(lambda value#654, lambda value#654, false))) AS map#656
```

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

added unit test

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50245 from wForget/SPARK-48922.

Authored-by: wforget <643348094@qq.com>
Signed-off-by: beliefer <beliefer@163.com>
(cherry picked from commit 1be108eedb832a3684fcc55ec15581a1347475f4)
Signed-off-by: beliefer <beliefer@163.com> (by wforget on 2025-03-13T02:39:05Z)
- ee9d2da: [SPARK-51466][SQL][HIVE][4.0] Eliminate Hive built-in UDFs initialization on Hive UDF evaluation

Backport https://github.com/apache/spark/pull/50232 to branch-4.0

### What changes were proposed in this pull request?

Fork a few methods from Hive to eliminate calls of `org.apache.hadoop.hive.ql.exec.FunctionRegistry` to avoid initializing Hive built-in UDFs

### Why are the changes needed?

Currently, when the user runs a query that contains Hive UDF, it triggers `o.a.h.hive.ql.exec.FunctionRegistry` initialization, which also initializes the [Hive built-in UDFs, UDAFs and UDTFs](https://github.com/apache/hive/blob/rel/release-2.3.10/ql/src/java/org/apache/hadoop/hive/ql/exec/FunctionRegistry.java#L500).

Since [SPARK-51029](https://issues.apache.org/jira/browse/SPARK-51029) (https://github.com/apache/spark/pull/49725) removes hive-llap-common from the Spark binary distributions, `NoClassDefFoundError` occurs.

```
org.apache.spark.sql.execution.QueryExecutionException: java.lang.NoClassDefFoundError: org/apache/hadoop/hive/llap/security/LlapSigner$Signable
    at java.base/java.lang.Class.getDeclaredConstructors0(Native Method)
    at java.base/java.lang.Class.privateGetDeclaredConstructors(Class.java:3373)
    at java.base/java.lang.Class.getConstructor0(Class.java:3578)
    at java.base/java.lang.Class.getDeclaredConstructor(Class.java:2754)
    at org.apache.hive.common.util.ReflectionUtil.newInstance(ReflectionUtil.java:79)
    at org.apache.hadoop.hive.ql.exec.Registry.registerGenericUDTF(Registry.java:208)
    at org.apache.hadoop.hive.ql.exec.Registry.registerGenericUDTF(Registry.java:201)
    at org.apache.hadoop.hive.ql.exec.FunctionRegistry.<clinit>(FunctionRegistry.java:500)
    at org.apache.hadoop.hive.ql.udf.generic.GenericUDF.initializeAndFoldConstants(GenericUDF.java:160)
    at org.apache.spark.sql.hive.HiveGenericUDFEvaluator.returnInspector$lzycompute(hiveUDFEvaluators.scala:118)
    at org.apache.spark.sql.hive.HiveGenericUDFEvaluator.returnInspector(hiveUDFEvaluators.scala:117)
    at org.apache.spark.sql.hive.HiveGenericUDF.dataType$lzycompute(hiveUDFs.scala:132)
    at org.apache.spark.sql.hive.HiveGenericUDF.dataType(hiveUDFs.scala:132)
    at org.apache.spark.sql.hive.HiveUDFExpressionBuilder$.makeHiveFunctionExpression(HiveSessionStateBuilder.scala:197)
    at org.apache.spark.sql.hive.HiveUDFExpressionBuilder$.$anonfun$makeExpression$1(HiveSessionStateBuilder.scala:177)
    at org.apache.spark.util.Utils$.withContextClassLoader(Utils.scala:187)
    at org.apache.spark.sql.hive.HiveUDFExpressionBuilder$.makeExpression(HiveSessionStateBuilder.scala:171)
    at org.apache.spark.sql.catalyst.catalog.SessionCatalog.$anonfun$makeFunctionBuilder$1(SessionCatalog.scala:1689)
    ...
```

Actually, Spark does not use those Hive built-in functions, but still needs to pull those transitive deps to make Hive happy. By eliminating Hive built-in UDFs initialization, Spark can get rid of those transitive deps, and gain a small performance improvement on the first call Hive UDF.

### Does this PR introduce _any_ user-facing change?

No, except for a small perf improvement on the first call Hive UDF.

### How was this patch tested?

Exclude `hive-llap-*` deps from the STS module and pass all SQL tests (previously some tests fail without `hive-llap-*` deps, see SPARK-51041)

Manually tested that call Hive UDF, UDAF and UDTF won't trigger `org.apache.hadoop.hive.ql.exec.FunctionRegistry.<clinit>`

```
$ bin/spark-sql
// UDF
spark-sql (default)> create temporary function hive_uuid as 'org.apache.hadoop.hive.ql.udf.UDFUUID';
Time taken: 0.878 seconds
spark-sql (default)> select hive_uuid();
840356e5-ce2a-4d6c-9383-294d620ec32b
Time taken: 2.264 seconds, Fetched 1 row(s)

// GenericUDF
spark-sql (default)> create temporary function hive_sha2 as 'org.apache.hadoop.hive.ql.udf.generic.GenericUDFSha2';
Time taken: 0.023 seconds
spark-sql (default)> select hive_sha2('ABC', 256);
b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78
Time taken: 0.157 seconds, Fetched 1 row(s)

// UDAF
spark-sql (default)> create temporary function hive_percentile as 'org.apache.hadoop.hive.ql.udf.UDAFPercentile';
Time taken: 0.032 seconds
spark-sql (default)> select hive_percentile(id, 0.5) from range(100);
49.5
Time taken: 0.474 seconds, Fetched 1 row(s)

// GenericUDAF
spark-sql (default)> create temporary function hive_sum as 'org.apache.hadoop.hive.ql.udf.generic.GenericUDAFSum';
Time taken: 0.017 seconds
spark-sql (default)> select hive_sum(*) from range(100);
4950
Time taken: 1.25 seconds, Fetched 1 row(s)

// GenericUDTF
spark-sql (default)> create temporary function hive_replicate_rows as 'org.apache.hadoop.hive.ql.udf.generic.GenericUDTFReplicateRows';
Time taken: 0.012 seconds
spark-sql (default)> select hive_replicate_rows(3L, id) from range(3);
3	0
3	0
3	0
3	1
3	1
3	1
3	2
3	2
3	2
Time taken: 0.19 seconds, Fetched 9 row(s)
```

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50264 from pan3793/SPARK-51466-4.0.

Authored-by: Cheng Pan <chengpan@apache.org>
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by Cheng Pan on 2025-03-13T08:27:19Z)
- d8ac4b7: [SPARK-51443][SS] Fix singleVariantColumn in DSv2 and readStream

### What changes were proposed in this pull request?

The current JSON `singleVariantColumn` mode doesn't work in DSv2 and `spark.readStream`. This PR fixes the two cases:
- DSv1 calls `JsonFileFormat.inferSchema`, which calls `JsonDataSource.inferSchema`; DSv2 calls `JsonDataSource.inferSchema`. The previous `singleVariantColumn` code was in `JsonFileFormat.inferSchema`, and is now moved into `JsonDataSource.inferSchema`, so that both cases can be covered.
- `spark.readStream` requires that there must be a user-specified schema. `singleVariantColumn` plays the same row as a user-specified schema, but the check would fail.

It also includes a small refactor that moves the option name definition `singleVariantColumn` from `JSONOptions` to `DataSourceOptions`. It will be a common option name shared by multiple data sources (e.g., CSV) when we add the implementation in the future.

### Why are the changes needed?

It is a bug fix that improves the usability of variant.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Unit test. A test previously in `VariantSuite` is moved to `JsonSuite`, so that we can test the read behavior in both `JsonV1Suite` and `JsonV2Suite`. The test is also extended to include `spark.readStream`.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50217 from chenhao-db/fix_json_singleVariantColumn.

Authored-by: Chenhao Li <chenhao.li@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 71638c4f50d8f5753d4b7bcf157c79395a47dd52)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Chenhao Li on 2025-03-13T13:33:36Z)
- 115d3a9: [SPARK-51506][PYTHON][SS] Do not enforce users to implement close() in TransformWithStateInPandas

### What changes were proposed in this pull request?

Do not enforce users to implement `close()` in TransformWithStateInPandas since `close()` is an optional function to implement.

### Why are the changes needed?

Optional function should not enforce users to implement. This also aligns with Scala TWS.

### Does this PR introduce _any_ user-facing change?

Yes.

### How was this patch tested?

Updated the existing unit test by not implement `close()` function in several stateful processors.

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50272 from bogao007/SPARK-51506.

Authored-by: bogao007 <bo.gao@databricks.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit a8e92e4b1b0671db825e188f2078aedf182bba49)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by bogao007 on 2025-03-14T00:31:43Z)
- bfa29a8: [SPARK-50763][SQL] Add Analyzer rule for resolving SQL table functions

### What changes were proposed in this pull request?

This PR adds an Analyzer rule to resolve SQL user-defined table functions.
It uses LateralJoin to construct the SQL table function plan, and apply additional checks to see if these lateral joins can be removed during the analysis stage.

### Why are the changes needed?

To support SQL user-defined functions.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Unit tests and SQL query tests.

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #49471 from allisonwang-db/spark-50763-resolve-sql-tvf.

Authored-by: Allison Wang <allison.wang@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 1c7b7d8de1c01836d77f2587633e7ebdc1bac450)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Allison Wang on 2025-03-14T02:37:14Z)
- c556e24: [SPARK-51502][SQL][TESTS] Move collations test to collations package

### What changes were proposed in this pull request?
Move collations test into collations package where most collation test suites already are located.

### Why are the changes needed?
For consistency purposes, also not to bloat the sql folder with too many suites.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Existing tests should suffice.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50268 from stefankandic/moveCollTests.

Authored-by: Stefan Kandic <stefan.kandic@databricks.com>
Signed-off-by: Max Gekk <max.gekk@gmail.com>
(cherry picked from commit 63f629686494c11976f4ee8c20cb8c72fa47459d)
Signed-off-by: Max Gekk <max.gekk@gmail.com> (by Stefan Kandic on 2025-03-14T16:03:18Z)
- 3bcff26: [SPARK-51501][SQL] Disable ObjectHashAggregate for group by on collated columns

### What changes were proposed in this pull request?
Disabling `ObjectHashAggregate` when grouping on columns with collations.

### Why are the changes needed?
https://github.com/apache/spark/pull/45290 added support for sort based aggregation on collated columns and explicitly forbade the use of hash aggregate for collated columns. However, it did not consider the third type of aggregate, the object hash aggregate, which is only used when there are also TypedImperativeAggregate expressions present ([source](https://github.com/apache/spark/blob/f3b081066393e1568c364b6d3bc0bceabd1e7e9f/sql/catalyst/src/main/scala/org/apache/spark/sql/catalyst/plans/logical/basicLogicalOperators.scala#L1204)).

That means that if we group by a collated column and also have a TypedImperativeAggregate we will end up using the object has aggregate which can lead to incorrect results like in the example below:

```code
CREATE TABLE tbl(c1 STRING COLLATE UTF8_LCASE, c2 INT) USING PARQUET;
INSERT INTO tbl VALUES ('HELLO', 1), ('hello', 2), ('HeLlO', 3);
SELECT COLLECT_LIST(c2) as list FROM tbl GROUP BY c1;
```
where the result would have three rows with values [1], [2] and [3] instead of one row with value [1, 2, 3].

For this reason we should do the same thing as we did for the regular hash aggregate, make it so that it doesn't support grouping expressions on collated columns.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
New unit tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50267 from stefankandic/fixObjectHashAgg.

Authored-by: Stefan Kandic <stefan.kandic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit f7495da2da8e2662c8746d44dd5f18de9ed3e982)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Stefan Kandic on 2025-03-14T23:43:16Z)
- f7d515c: [SPARK-51112][PYTHON][CONNECT][FOLLOW-UP] Explicitly set index=range(0) for empty table

### What changes were proposed in this pull request?

This PR is a followup of https://github.com/apache/spark/pull/49834 that uses `range(0)` for its index explicitly.

### Why are the changes needed?

In order to avoid having behaviour changes.

Without this fix / pandas 1.5.3

```python
>>> import pandas as pd
>>> pd.DataFrame(columns=["a"]).index
Index([], dtype='object')
```

With this fix / pandas 1.5.3

```python
>>> import pandas as pd
>>> pd.DataFrame(columns=["a"], index=range(0)).index
RangeIndex(start=0, stop=0, step=1)
```

pandas 2.x

```python
>>> import pandas as pd
>>> pd.DataFrame(columns=["a"]).index
RangeIndex(start=0, stop=0, step=1)
```

### Does this PR introduce _any_ user-facing change?

No, this PR technically fixes a regression.

### How was this patch tested?

Manually ran tests against pandas 1.5.3

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50292 from HyukjinKwon/SPARK-51112-followup.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 00296d241b7671b6b603fe625227f6c8b530d618)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-17T10:16:08Z)
- 3a43cdc: [SPARK-51428][SQL] Reassign Aliases for collated expression trees deterministically

### What changes were proposed in this pull request?

Reassign Aliases for collated expression trees deterministically at the end of Analysis.

### Why are the changes needed?

Consider the following collated queries and their schemas:
1.
```
SELECT 'a' COLLATE UTF8_LCASE < 'A'
->
(collate(a, UTF8_LCASE) < 'A' collate UTF8_LCASE)
```

2.
```
SELECT CONCAT_WS('a', col1, col1) FROM VALUES ('a' COLLATE UTF8_LCASE)
->
concat_ws(a, col1, col1)
```

The 1. case has an explicit alias where 'A' literal is marked as collated, which is correct. However, in the second case, 'a' literal is not marked as collated in the output implicit alias, despite the fact that it is indeed collated by `CollationTypeCoercion`. The 2. output schema has to be `concat_ws('a' collate UTF8_LCASE, col1, col1)`.

This happens because in 1. case `ResolveAliases` runs after the `AnsiCombinedTypeCoercionRule`, and in 2. case the order is the opposite, so alias is assigned before the actual data type is collated. `ResolveAliases` relies on the aliased expression subtree being resolved. In the context of type coercion it's `checkInputDataTypes`. But this predicate doesn't really know about collations. Ideally we would fix all the `checkInputDataTypes`, but that would be quite involved.

### Does this PR introduce _any_ user-facing change?

Yes, implicit aliases of collated expression trees now change. This is a breaking change.

### How was this patch tested?

Golden files were regenerated

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50192 from vladimirg-db/vladimir-golubev_data/fix-unstable-collation-aliases.

Authored-by: Vladimir Golubev <vladimir.golubev@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit a47e2cc955a470e5a29388c0b9004bda94f0ad4e)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Vladimir Golubev on 2025-03-17T12:38:06Z)
- 14b3b82: [SPARK-51525][SQL] Collation field for Desc As JSON StringType

### What changes were proposed in this pull request?

Add a collation field for Desc As JSON StringType.

For example:

```
"columns":[{"name":"c1","type":{"name":"string", "collation":"UNICODE_CI"}
```

or the default collation value:

```
"columns":[{"name":"c1","type":{"name":"string", "collation":"UTF8_BINARY"}
```

### Why are the changes needed?

Add support for collation data type in Desc As JSON

### Does this PR introduce _any_ user-facing change?

Yes, it affects the output of Desc As JSON for collation data type.

### How was this patch tested?

Added test in DescribeTableSuite

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50290 from asl3/asl3/collation-descasjson.

Authored-by: Amanda Liu <amanda.liu@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 513a080ba0924a8831a3aa011a9a9852afe012d2)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Amanda Liu on 2025-03-18T00:39:41Z)
- f96ae0c: [SPARK-51349][SQL][TESTS] Change precedence of null and "null" in sorting in QueryTest

### What changes were proposed in this pull request?

Prior to this PR, it was difficult to evaluate tests where the resulting DataFrame would contain both "null" strings and null values since they had the same precedence in QueryTest sorting. This PR changes their precedence.

### Why are the changes needed?

Currently DataFrames representing `["null", null]` and `[null, "null"]` are not considered equal in checkAnswer even though they are. This PR fixes it.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Unit test.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50108 from harshmotw-db/harsh-motwani_data/variant_get_column.

Authored-by: Harsh Motwani <harsh.motwani@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit fa9dab05422235070d2ff586638331b2ab3cfd72)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Harsh Motwani on 2025-03-18T05:53:41Z)
- 909ea96: [SPARK-51451][SQL] Fix ExtractGenerator to wait for UnresolvedStarWithColumns to be resolved

### What changes were proposed in this pull request?

Fixes `ExtractGenerator` to wait for `UnresolvedStarWithColumns` to be resolved.

### Why are the changes needed?

`df.withColumn` is now analyzed in the analyzer, it causes `ExtractGenerator` rule to misunderstand that the generator is nested.

This happens with Spark Connect more often because Spark Classic usually can resolve `UnresolvedStarWithColumns` before `ExtractGenerator` rule, whereas Spark Connect sometimes needs several iteration of resolving rules.

```py
from pyspark.sql.functions import *

df = spark.createDataFrame([("082017",)], ['dt'])
df_dt = df.select(date_format(to_date(col("dt"), "MMyyyy"), "MM/dd/yyyy").alias("dt"))

monthArray = [lit(x) for x in range(0, 12)]
df_month_y = df_dt.withColumn("month_y", explode(array(monthArray)))

df_month_y.show()
```

```
pyspark.errors.exceptions.connect.AnalysisException: [UNSUPPORTED_GENERATOR.NESTED_IN_EXPRESSIONS] The generator is not supported: nested in expressions "unresolvedstarwithcolumns(explode(array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)))". SQLSTATE: 42K0E
```

Its parsed plan is:

```
== Parsed Logical Plan ==
'Project [unresolvedstarwithcolumns(month_y, 'explode('array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)), Some(List({})))]
+- 'Project ['date_format('to_date('dt, MMyyyy), MM/dd/yyyy) AS dt#5]
   +- 'UnresolvedSubqueryColumnAliases [dt]
      +- LocalRelation [dt#4]
```

Here `explode` is nested in `unresolvedstarwithcolumns`.

### Does this PR introduce _any_ user-facing change?

Yes, `df.withColumn` with generators will be back available.

### How was this patch tested?

Added the related tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50286 from ueshin/issues/SPARK-51451/with_column_generator.

Authored-by: Takuya Ueshin <ueshin@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 0de6f2995c786bb0be0020fc76d22e79e4f9631f)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Takuya Ueshin on 2025-03-18T06:21:41Z)
- 0996196: [SPARK-51187][SPARK-49699][SQL][SS][4.0] Implement the graceful deprecation of incorrect config introduced in

### What changes were proposed in this pull request?

This PR proposes to implement the graceful deprecation of incorrect config introduced in SPARK-49699.

SPARK-49699 was included in Spark 3.5.4, hence we can't simply rename to fix the issue.

Also, since the incorrect config is logged in offset log in streaming query, the fix isn't just easy like adding withAlternative and done. We need to manually handle the case where offset log contains the incorrect config, and set the value of incorrect config in the offset log into the new config. Once a single microbatch has planned after the restart (hence the above logic is applied), offset log will contain the "new" config and it will no longer refer to the incorrect config.

That said, we can remove the incorrect config in the Spark version which we are confident that there will be no case users will upgrade from Spark 3.5.4 to that version.

### Why are the changes needed?

We released an incorrect config and we want to rename it properly. While renaming, we don't also want to have any breakage on the existing streaming query.

### Does this PR introduce _any_ user-facing change?

No. That is what this PR is aiming for.

### How was this patch tested?

New UT.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #49984 from HeartSaVioR/SPARK-51187-4.0.

Authored-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Jungtaek Lim on 2025-03-19T08:11:51Z)
- a05ec9f: Preparing Spark release v4.0.0-rc3 (by Wenchen Fan on 2025-03-19T09:32:46Z)
- 38edb10: Preparing development version 4.0.1-SNAPSHOT (by Wenchen Fan on 2025-03-19T09:32:50Z)
- 3d86f29: [SPARK-51565][SQL] Support SQL parameters in window frame clause

### What changes were proposed in this pull request?
This PR allows for SQL named and positional parameters to be used within the window frame clause of window expressions.

### Why are the changes needed?
SQL parameters should be supported for this use case.

### Does this PR introduce _any_ user-facing change?
Yes, users can now use sql parameters in window frame clauses.

### How was this patch tested?
Unit tests were added testing this case.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50328 from dusantism-db/window-function-params.

Authored-by: Dušan Tišma <dusan.tisma@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 674fd7a6f4d70ff1c7cf9c47519f869bfbb94811)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dušan Tišma on 2025-03-20T02:20:13Z)
- dc20ec4: [SPARK-50416][CORE] A more portable terminal / pipe test needed for bin/load-spark-env.sh

### What changes were proposed in this pull request?
The last action in [bin/load-spark-env.sh](https://github.com/apache/spark/blob/d5da49d56d7dec5f8a96c5252384d865f7efd4d9/bin/load-spark-env.sh#L68) performs a test to determine whether running in a terminal or not, and whether `stdin` is reading from a pipe.   A more portable test is needed.

### Why are the changes needed?
The current approach relies on `ps` with options that vary significantly between different Unix-like systems.  Specifically, it prints an error message in both `cygwin` and `msys2` (and by extension, in all of the variations of `git-for-windows`).   It doesn't print an error message, but fails to detect a terminal session in `Linux` and `Osx/Darwin homebrew` (always thinks STDIN is a pipe).

Here's what the problem looks like in a `cygwin64` session (with `set -x` just ahead of the section of interest):

If called directly:
```bash
$ bin/load-spark-env.sh
++ ps -o stat= -p 1947
ps: unknown option -- o
Try `ps --help' for more information.
+ [[ ! '' =~ \+ ]]
+ [[ -p /dev/stdin ]]
+ export 'SPARK_BEELINE_OPTS= -Djline.terminal=jline.UnsupportedTerminal'
+ SPARK_BEELINE_OPTS=' -Djline.terminal=jline.UnsupportedTerminal'
```
Interestingly, due to the 2-part test, it does the right thing w.r.t. the Terminal test, the main problem being the error message.
If called downstream from a pipe:
```bash
$ echo "yo" | bin/load-spark-env.sh
++ ps -o stat= -p 1955
ps: unknown option -- o
Try `ps --help' for more information.
+ [[ ! '' =~ \+ ]]
+ [[ -p /dev/stdin ]]
```
Again, it correctly detects the pipe environment, but with an error message.

In WSL2 Ubuntu, the test doesn't correctly detect a non-pipe terminal session:
```bash
# /opt/spark$ bin/load-spark-env.sh
++ ps -o stat= -p 1423
+ [[ ! S+ =~ \+ ]]
# echo "yo!" | bin/load-spark-env.sh
++ ps -o stat= -p 1416
+ [[ ! S+ =~ \+ ]]
```
In `#134-Ubuntu SMP Fri Sep 27 20:20:17 UTC 2024`, the same failure occurs (it doesn't recognize terminal environments).

### Does this PR introduce _any_ user-facing change?
This is a proposed bug fix, and, other than fixing the bug,  should be invisible to users.

### How was this patch tested?
The patch was verified to behave as intended in terminal sessions, both interactive and piped, in the following 5 environments.
```

- Linux quadd 5.15.0-124-generic #134-Ubuntu SMP Fri Sep 27 20:20:17 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux
- Linux d5 5.15.153.1-microsoft-standard-WSL2 #1 SMP Fri Mar 29 23:14:13 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux
- MINGW64_NT-10.0-22631 d5 3.5.4-0bc1222b.x86_64 2024-09-04 18:28 UTC x86_64 Msys
- CYGWIN_NT-10.0-22631 d5 3.5.3-1.x86_64 2024-04-03 17:25 UTC x86_64 Cygwin
- Darwin suemac.local 23.6.0 Darwin Kernel Version 23.6.0: Mon Jul 29 21:14:21 PDT 2024; root:xnu-10063.141.2~1/RELEASE_ARM64_T8103 arm64

```
The test was to manually run the following script, verifying the expected response to both pipe and terminal sessions.
```bash
#!/bin/bash
if [ -e /usr/bin/tty -a "`tty`" != "not a tty" -a ! -p /dev/stdin ]; then
  echo "not a pipe"
else
  echo "is a pipe"
fi
```
The output of the manual test in all 5 tested environments.
```
philwalkquadd:/opt/spark
$ isPipe
not a pipe
#
$ echo "yo" | isPipe
is a pipe
#
```

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #48937 from philwalk/portability-fix-for-load-spark-env.sh.

Authored-by: philwalk <philwalk9@gmail.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 8d260084b8a50ff59a127c7292c0cdb6737981b0)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by philwalk on 2025-03-20T02:34:14Z)
- 130625a: [SPARK-51433][PYTHON][FOLLOWUP] Fix pyspark-client package file name

### What changes were proposed in this pull request?

Fixes `pyspark-client` package file name.

### Why are the changes needed?

The file name seems to be typoed.

### Does this PR introduce _any_ user-facing change?

Yes, it uses a proper package name.

### How was this patch tested?

Manually.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50331 from ueshin/issues/SPARK-51433/pyspark_client.

Authored-by: Takuya Ueshin <ueshin@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 3ffb8009a3d660f25b4d003d0e702d60e8527ab6)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Takuya Ueshin on 2025-03-20T05:06:44Z)
- ca56e9c: Preparing Spark release v4.0.0-rc3 (by Wenchen Fan on 2025-03-20T05:14:39Z)
- d7ded8b: Preparing development version 4.0.1-SNAPSHOT (by Wenchen Fan on 2025-03-20T05:14:42Z)
- 71f9749: [SPARK-47241][SQL][FOLLOWUP] Fix issue when laterally referencing a `Generator`

### What changes were proposed in this pull request?
Fix issue when laterally referencing a `Generator`.

### Why are the changes needed?
Fix the following query pattern:
```
WITH cte AS (SELECT EXPLODE(ARRAY(1, 2, 3)) AS c1, c1) SELECT * FROM cte
```

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Added a test case to `LateralColumnAliasSuite`

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50310 from mihailotim-db/mihailotim-db/generator_lca.

Authored-by: Mihailo Timotic <mihailo.timotic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 62c06692e47ef4b8488ea5d8ecae7c708f0ee808)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Mihailo Timotic on 2025-03-20T05:28:03Z)
- 5372d5f: [SPARK-51567][ML][CONNECT] Fix `DistributedLDAModel.vocabSize`

### What changes were proposed in this pull request?
Fix `DistributedLDAModel.vocabSize`

### Why are the changes needed?
```
pyspark.errors.exceptions.connect.SparkException: [CONNECT_ML.ATTRIBUTE_NOT_ALLOWED] Generic Spark Connect ML error. vocabSize in org.apache.spark.ml.clustering.DistributedLDAModel is not allowed to be accessed. SQLSTATE: XX000

JVM stacktrace:
org.apache.spark.sql.connect.ml.MLAttributeNotAllowedException
	at org.apache.spark.sql.connect.ml.MLUtils$.validate(MLUtils.scala:686)
	at org.apache.spark.sql.connect.ml.MLUtils$.invokeMethodAllowed(MLUtils.scala:691)
	at org.apache.spark.sql.connect.ml.AttributeHelper.$anonfun$getAttribute$1(MLHandler.scala:56)
```

### Does this PR introduce _any_ user-facing change?
yes, new api supported

### How was this patch tested?
added test

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50330 from zhengruifeng/ml_connect_lda_vocabSize.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org>
(cherry picked from commit f4875152725128486fc3d318a3abb90e40d9b8da)
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by Ruifeng Zheng on 2025-03-20T06:23:11Z)
- 768ce38: Revert #48786 - "Revert "[SPARK-48273][SQL] Fix late rewrite of PlanWithUnresolvedIdentifier""

### What changes were proposed in this pull request?
This PR reverts https://github.com/apache/spark/pull/48786

### Why are the changes needed?
Custom rules in the early analyzer batches (custom hint resolution rules injection) can match `UnresolvedRelation`, which is only visible after the IDENTIFIER clause is expanded.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Existing tests + added a unit test.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50311 from dusantism-db/identifier-revert.

Authored-by: Dušan Tišma <dusan.tisma@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 7dfb8fe3f158ea1299d22aa403fa6354307e9671)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Dušan Tišma on 2025-03-20T13:58:47Z)
- 9099c02: [SPARK-51496][SQL] CaseInsensitiveStringMap comparison should ignore case

### What changes were proposed in this pull request?
Since both `commandOptions` and `dsOptions` are `CaseInsensitiveStringMap` objects, I think we should convert the keys and values to lowercase before comparing them

### Why are the changes needed?

In iceberg/spark4.0 integration, I got a few assertion errors:
```
assertion failed
java.lang.AssertionError: assertion failed
	at scala.Predef$.assert(Predef.scala:264)
	at org.apache.spark.sql.execution.datasources.v2.V2Writes$.org$apache$spark$sql$execution$datasources$v2$V2Writes$$mergeOptions(V2Writes.scala:128)
```

The assertion error occurs when comparing commandOptions and dsOptions; the cases of the keys don't match.
```
assert(commandOptions == dsOptions)
```

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
I have verified that the iceberg tests can pass with this fix.

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50275 from huaxingao/mergeOptions.

Authored-by: huaxingao <huaxin.gao11@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit bfe63a3d3e537fdd5b3f0df9da432e7f404a62d7)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by huaxingao on 2025-03-20T23:03:45Z)
- 29d262f: [SPARK-51549][BUILD] Bump Parquet 1.15.1

### What changes were proposed in this pull request?

Bump Parquet 1.15.1.

### Why are the changes needed?

Release Notes https://github.com/apache/parquet-java/releases/tag/apache-parquet-1.15.1

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Pass GHA.

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50319 from pan3793/SPARK-51549.

Authored-by: Cheng Pan <chengpan@apache.org>
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org>
(cherry picked from commit bd581ec979874d0dd3dfb225929d6a14efa11191)
Signed-off-by: Dongjoon Hyun <dongjoon@apache.org> (by Cheng Pan on 2025-03-21T00:20:04Z)
- ffaeeb4: [SPARK-50953][FOLLOW-UP] Improve path parsing in variant_get

### What changes were proposed in this pull request?

The variant_get paths currently do not allow '?' in keys or empty strings as keys.

**Note:** Even after this fix, some set of paths are still prohibited - particularly those containing both single and double quotes. For example, there is no way to extract 1 from `{"\"sample string's\"" : 1}`. If you use the double quotes notation, double quotes are prohibited. If you use the single quotes notation, single quotes are prohibited. I tried to add support for escaped double quotes in the path but it is not the same because parse_json gets rid of the `\`.

### Why are the changes needed?

JSON strings with empty keys and keys containing '?' can be parsed as variant using `parse_json`. However, there is currently no way to extract values corresponding to these keys using variant_get. i.e. `variant_get(parse_json('{"" : 1}'), '$[""]')` and `variant_get(parse_json('{"?" : 1}'), '$["?"]')` fail.

### Does this PR introduce _any_ user-facing change?

Yes, users would now be able to extract a more diverse set of paths from a variant.

### How was this patch tested?

Unit tests

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50342 from harshmotw-db/harsh-motwani_data/variant_get_fix.

Authored-by: Harsh Motwani <harsh.motwani@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 59b0fca69d31ee57b5c3b8b0df7757a7c165b4c9)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Harsh Motwani on 2025-03-21T06:19:12Z)
- c5fe151: [SQL][MINOR][TEST] InMemoryTableCatalog should list procedures namespaces

### What changes were proposed in this pull request?
Add procedures namespaces to the list of namespaces.

### Why are the changes needed?
This makes the list of namespace more accurate

I found this while adding tests for https://github.com/apache/spark/pull/50109

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Existing unit test.  I consider to make a test, but it may be overkill as its already a test class.

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50329 from szehon-ho/minor-in-memory-catalog.

Lead-authored-by: Szehon Ho <szehon.apache@gmail.com>
Co-authored-by: Wenchen Fan <cloud0fan@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 9dc5e94deb1496a4acf97816b10fd03a922b257b)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Szehon Ho on 2025-03-21T07:46:03Z)
- 85d68be: [SPARK-51569][SQL] Don't reinstantiate `InSubquery` in `InTypeCoercion` if there are no type changes

### What changes were proposed in this pull request?
Don't reinstantiate `InSubquery` in `InTypeCoercion` if there is no type change.

### Why are the changes needed?
For following query pattern: `select map(1,2) in (select map(1,2))` it is not possible to type coerce left or right hand side because `MapType` is not orderable. However, in `InTypeCoercion` we always add a `Project` node on top, resulting in the plan exploding and never reaching fixed-point, therefore failing with either `max iterations reached` or `StackOverflow` error. In this PR we introduce a constraint that we only add a `Project` if there was a type change to either left or right hand side

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Added a test case for expected error

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50339 from mihailotim-db/mihailotim-db/fix_in_coercion.

Authored-by: Mihailo Timotic <mihailo.timotic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 8469afd8f58542176d574814f52412893e782727)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Mihailo Timotic on 2025-03-21T07:57:03Z)
- 6abb0d8: [SPARK-42746][FOLLOW-UP][SQL] Fix flaky listagg tests and refactor code

### What changes were proposed in this pull request?
It was noticed that some tests could be flaky for listagg. The flakiness mainly can come due to non-deterministic behaviour of grouping by a column or collations (i.e. utf8_lcase, unicode_rtrim...). This PR aims to make queries more deterministic by checking only the required info in the result of listagg queries.

### Why are the changes needed?
We do not want to waste resources on flaky tests. Also, we want the tests to scope the minimum set of truth,  which means we do not assume ordering in specific result, when there was an aggregation or grouping.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Test only change.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50338 from mihailom-db/listaggFollowUp.

Authored-by: Mihailo Milosevic <mihailo.milosevic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 5f2d37e0b429a940dc52872c41ac71e4012f22dd)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Mihailo Milosevic on 2025-03-21T13:18:10Z)
- 5f0baeb: [SPARK-51118][PYTHON] Fix ExtractPythonUDFs to check the chained UDF input types for fallback

### What changes were proposed in this pull request?

Fixes `ExtractPythonUDFs` to check the chained UDF input types for fallback.

### Why are the changes needed?

Currently the fallback of Arrow-optimized Python UDF to non Arrow for the case the UDF has UDT input/output only works with not chained UDFs because it checks only the last UDFs.

For example:

```py
from pyspark.sql.functions import udf
from pyspark.sql.types import *
from pyspark.testing.sqlutils import ExamplePoint, ExamplePointUDT

row = Row(
    label=1.0,
    point=ExamplePoint(1.0, 2.0),
)

df = spark.createDataFrame([row])

udf(returnType=DoubleType(), useArrow=True)
def udtInDoubleOut(e):
    return e.y

udf(returnType=DoubleType(), useArrow=True)
def doubleInDoubleOut(d):
    return d * 100.0

df.select(doubleInDoubleOut(udtInDoubleOut(df.point))).show()
```

This doesn't fallback to non Arrow because `doubleInDoubleOut` looks like no UDT input/output and fails with:

```
pyspark.errors.exceptions.captured.PythonException:
  An exception was thrown from the Python worker. Please see the stack trace below.
Traceback (most recent call last):
  ...
AttributeError: 'list' object has no attribute 'y'
```

### Does this PR introduce _any_ user-facing change?

Yes, the fallback will work with chained UDFs, too.

### How was this patch tested?

Added the related tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50341 from ueshin/issues/SPARK-51118/chained_udf_with_udt.

Authored-by: Takuya Ueshin <ueshin@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 4e30f967e772329b305bf34c049e4681fac06f66)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Takuya Ueshin on 2025-03-24T02:10:37Z)
- 057327c: [SPARK-51540][PS][DOCS] Best practice for distributed-sequence misalignment case

### What changes were proposed in this pull request?

This PR proposes to update the warning and add best practice for handling index misalignment case with distributed-sequence when using specific operations.

### Why are the changes needed?

To clearly document the inconsistent behavior with Pandas and let users know about the workarounds.

### Does this PR introduce _any_ user-facing change?

User-facing documentation updated

<img width="797" alt="Screenshot 2025-03-18 at 3 07 38 PM" src="https://github.com/user-attachments/assets/966b0449-0b96-4f59-9eb3-ede12d19bc73" />

### How was this patch tested?

Manually tested

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50302 from itholic/dis-seq-best-prac.

Authored-by: Haejoon Lee <haejoon.lee@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 8e9eada4b4ce93cf5e2535061074d782d1267f7d)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Haejoon Lee on 2025-03-24T02:42:27Z)
- 6953ca2: [SPARK-48466][SQL][UI][FOLLOWUP] Handle nested empty relation in SparkPlanInfo

### What changes were proposed in this pull request?

Fix `SparkPlanInfo.fromLogicalPlan` to handle nested empty relation.

Before:
<img width="294" alt="Screenshot 2025-03-21 at 11 30 56 AM" src="https://github.com/user-attachments/assets/d03f6b88-13ad-4b67-bc4d-18b532e4dea2" />

After:

<img width="390" alt="Screenshot 2025-03-20 at 5 51 21 PM" src="https://github.com/user-attachments/assets/0e4f775c-b9cf-4955-af17-5e47fa44e44b" />

### Why are the changes needed?

A followup for https://github.com/apache/spark/pull/46830, in the original PR I forget to handle nested empty relation.

### Does this PR introduce _any_ user-facing change?
Yes, UI change

### How was this patch tested?
Verifed in Spark UI

### Was this patch authored or co-authored using generative AI tooling?
NO

Closes #50350 from liuzqt/SPARK-48466.

Authored-by: liuzqt <liuzq12@hotmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit b8e0246f3ef43f49dd6804e5a583bbe0d09f5a81)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by liuzqt on 2025-03-24T10:51:55Z)
- 3f85d37: [SPARK-42746][SQL][FOLLOWUP] Fixing potential flakiness in ListAgg golden files

### What changes were proposed in this pull request?
Original PR (https://github.com/apache/spark/pull/50338) fixed some of the flakiness, but there were more tests that could potentially be flaky. This PR is fixing these issues.

### Why are the changes needed?
We should not rely in golden files tests on buffer ordering. This could lead to flakiness in tests and we need to fix it, so that we do not waste resources.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Test only change.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50357 from mihailom-db/listaggfollowup2.

Authored-by: Mihailo Milosevic <mihailo.milosevic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit e4b6e9aa1ada9b08a3ea6b6338adbea12caeccf2)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Mihailo Milosevic on 2025-03-24T11:28:25Z)
- 8ca10fc: Revert "[SPARK-51229][BUILD][CONNECT] Fix dependency:analyze goal on connect common"

This reverts commit 2246b1bc1f9a467edb10c8a904e5bf3ea44fa4bc. (by Hyukjin Kwon on 2025-03-24T11:37:30Z)
- a46ba7d: [SPARK-51146][INFRA][FOLLOW-UP] Explicitly disable Spark Connect in server side scripts

### What changes were proposed in this pull request?

This PR is technically a followup of https://github.com/apache/spark/pull/49865 that explicitly sets `SPARK_CONNECT_MODE` to `0`.

### Why are the changes needed?

Otherwise, it all fails to start a cluster, launch a Spark Connect with locally running Spark Connect server, etc.

### Does this PR introduce _any_ user-facing change?

Not yet. The main change has not been released out yet.

### How was this patch tested?

I tested by manually adding:

```
export SPARK_CONNECT_MODE=${SPARK_CONNECT_MODE:-1}
```

into `bin/pyspark`, `bin/spark-shell`, and `bin/spark-sql`.

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50363 from HyukjinKwon/SPARK-51146-followup.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 03b62c27862a5a592cec3ae46c0231a503a1d83c)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-24T11:47:16Z)
- aeb3c86: [SPARK-51576][SQL] Prohibit ANSI cast from `array<variant, containsNull = false>` to `array<_, containsNull = false>`

### What changes were proposed in this pull request?

This PR prohibits ANSI cast from `ArrayType(VariantType, containsNull = false)` to `ArrayType(_, containsNull = false)`, or `StructField(VariantType, nullable = false)` to `StructField(_, nullable = true)` or `MapType(_, VariantType, valueContainsNull = false)` to `MapType(_, _, valueContainsNull = false)`.

### Why are the changes needed?

Variant is the only data type which can be ANSI cast from a non-null value to a null value. More specifically, variant nulls (generated using `parse_json('null')`) when cast to string result in `null`.
However, `array<variant, containsNull = false>` can be cast to `array<string, containsNull = true>`. This should not be allowed since `array(parse_json('null'))` would give `array(null)` after this cast.
Here is a demonstration of this problem where we create an `array<string, containsNull = true>` which in fact does not contain nulls:
```
>>> from pyspark.sql.functions import col
>>> from pyspark.sql.types import StringType, VariantType, ArrayType
>>> 
>>> df = spark.sql("select array(parse_json('null')) arr")
>>> df.printSchema()
root
 |-- arr: array (nullable = false)
 |    |-- element: variant (containsNull = false)

>>> df2 = df.select(col('arr').cast(ArrayType(StringType(), False)))
>>> df2.selectExpr("arr[0] is null").show()
+----------------+
|(arr[0] IS NULL)|
+----------------+
|            true|
+----------------+

>>> df2.printSchema()
root
 |-- arr: array (nullable = false)
 |    |-- element: string (containsNull = false)
```

### Does this PR introduce _any_ user-facing change?

Yes, users can no longer ANSI cast from `array<variant, containsNull = false>` to `array<_, containsNull = false>`. However, it is unlikely that users were hardcoding `containsNull = false`. The same is the case for struct field and maps.

### How was this patch tested?

Unit tests making sure that only `containsNull = false` cases fail.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50343 from harshmotw-db/harsh-motwani_data/variant_cast_fix.

Authored-by: Harsh Motwani <harsh.motwani@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 084143b977a9c1a8eee50aea77125f29fa5267d0)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Harsh Motwani on 2025-03-24T13:29:58Z)
- edfb64b: [SPARK-51589][SQL] Fix small bug failing to check for aggregate functions in |> SELECT

### What changes were proposed in this pull request?

This PR fixes a small bug with `|> SELECT` with aggregate functions without aliases. In such cases, we should be returning an error instructing the user to use `|> AGGREGATE` instead, but we do not.

This bug only happens when the aggregate function does not have any alias.

For example:

```
VALUES (0), (1) tab(col)
|> SELECT SUM(col)
```

Before this PR, the above query returned a result of 1. After this PR, the above query instead returns an error instructing the user to switch to `|> AGGREGATE` to perform the sum operation instead.

### Why are the changes needed?

The documented behavior of `|> SELECT` is that the expression list must not contain any aggregate functions, and the user receives an error otherwise.

### Does this PR introduce _any_ user-facing change?

Yes, see above.

### How was this patch tested?

This PR adds golden file based test coverage.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50352 from dtenedor/fix-pipe-select-agg-bug.

Authored-by: Daniel Tenedorio <daniel.tenedorio@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 1ede242a516718311a7b154ef7b16682607ee0c5)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Daniel Tenedorio on 2025-03-24T13:46:50Z)
- e0c364e: [SPARK-51586][SS] initialize input partitions independent of columnar support in continuous mode

### What changes were proposed in this pull request?
Initialize input partitions independent of columnar support in `ContinuousScanExec`

### Why are the changes needed?
After [SPARK-45080](https://issues.apache.org/jira/browse/SPARK-45080) and [PR 42823](https://github.com/apache/spark/pull/42823) Kafka continuous stream may go into infinite loop of reconfiguring. As `KafkaScan` columnar support mode is hardcoded to `UNSUPPORTED` `ContinuousScanExec` does not initialize `inputPartitions` in `supportsColumnar` as it did prior to the above PR. So, there is no call to `KafkaContinuousStream.planInputPartitions` during query planning. It leaves `KafkaContinuousStream.knownPartitions` uninitialized, so call to `needsReconfiguration` returns `true`. Now `epochUpdateThread` in `ContinuousExecution` requests interruption of `queryExecutionThread`, so that thread also can't initialize `knownPartitions` as it checks for interrupts in `KafkaOffsetReaderAdmin.withRetries` and exits before `knownPartitions` is assigned.

### Does this PR introduce _any_ user-facing change?
Yes, it fixes bug that may prevent kafka continuous stream from working properly

### How was this patch tested?
Using existing Kafka tests. Those tests should complete faster.

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50348 from vrozov/SPARK-51586.

Authored-by: Vlad Rozov <vrozov@amazon.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 11d1409fc82870872158f6f1b75a54f14bdea702)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Vlad Rozov on 2025-03-25T01:35:24Z)
- 0836889: [SPARK-51580][SQL] Throw proper user facing error message when lambda function is out of place in `HigherOrderFunction`

### What changes were proposed in this pull request?
Throw proper user facing error message when lambda function is out of place in `HigherOrderFunction`.

### Why are the changes needed?
Currently, the analysis fails with `invalid call to dataType`.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Added new test cases with expected error message.

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50345 from mihailotim-db/mihailotim-db/lambda_error_message.

Authored-by: Mihailo Timotic <mihailo.timotic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 90050f51c1a7de79847cd99786a52492ce606240)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Mihailo Timotic on 2025-03-25T07:19:24Z)
- 54e90e9: [SPARK-51594][SQL] Use empty schema when saving a view which is not Hive compatible

### What changes were proposed in this pull request?

This is a long-standing issue. Spark always tries to save views in the Hive-compatible way, and only set the schema to empty if the save operation fails. However, for certain Hive compatibility issues, the save operation works but the following read operations will fail.

This PR fixes this issue by setting view schema to empty if it's not Hive compatible.

### Why are the changes needed?

to not create malformed views that no one can read.

### Does this PR introduce _any_ user-facing change?

Yes, the malformed view will be saved in non hive compatible way so that Spark can read it.

### How was this patch tested?

updated test case

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #50367 from cloud-fan/view.

Authored-by: Wenchen Fan <wenchen@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 9b51820d160f4db99aa0ca559c3744b3549a22b5)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Wenchen Fan on 2025-03-25T13:57:26Z)
- 6cd48d5: [MINOR][SQL] Desc As JSON test for top-level default collation field

### What changes were proposed in this pull request?

Follow-up to https://github.com/apache/spark/pull/50290. Add a test that Desc As JSON includes a top-level field `collation` when a default table collation is specified.

### Why are the changes needed?

Test that Desc As JSON supports default table collation in addition to column collations.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Added test in DescribeTableSuite

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50386 from asl3/asl3/descasjson-testdefaultcollation.

Authored-by: Amanda Liu <amanda.liu@databricks.com>
Signed-off-by: Gengliang Wang <gengliang@apache.org>
(cherry picked from commit 94535c91f79cee98184e53a7ef71aff8add7879f)
Signed-off-by: Gengliang Wang <gengliang@apache.org> (by Amanda Liu on 2025-03-25T21:13:04Z)
- dd96a3d: [SPARK-51587][PYTHON][SS] Fix an issue where timestamp cannot be used in ListState when multiple state data is involved

### What changes were proposed in this pull request?

Fix an issue where timestamp cannot be used in ListState when multiple state data is involved.

When transmitting multiple state data, we use Arrow to construct an Arrow record batch from Pandas dataframe, but this needs proper [type conversion](https://github.com/apache/spark/blob/5f2d37e0b429a940dc52872c41ac71e4012f22dd/python/pyspark/sql/pandas/types.py#L1411-L1439) to make it compatible with Spark.

Timestamp is missed in this conversion util. Since the timestamp precision in Pandas is nanosecond while the precision in Spark is microsecond, we need proper conversion to make them compatible.

### Why are the changes needed?

Without this change, using a timestamp type with ListState `put()` or `appendList()` will result in below error
```
[UNSUPPORTED_ARROWTYPE] Unsupported arrow type Timestamp(NANOSECOND, null). SQLSTATE: 0A000
```

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Added new test case.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50349 from bogao007/tws-timestamp-fix.

Authored-by: bogao007 <bo.gao@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by bogao007 on 2025-03-25T23:33:24Z)
- 2380e88: [SPARK-51607][CONNECT][BUILD] Set `combine.self = "override"` to configuration of `maven-shade-plugin` in `connect` modules

### What changes were proposed in this pull request?
Similar to the situation in SPARK-50166, for modules that have independently configured shading and relocation rules, the `configuration` tag of `maven-shade-plugin` should be set with `combine.self = "override"`. This pull request makes similar modifications to three modules related to connect.

### Why are the changes needed?
Avoid the `maven-shade-plugin` configuration in connect-related modules from being affected by the default configuration in the parent `pom.xml`.

For example, before this pull request, the `com.google.common.cache.{CacheBuilder, CacheLoader}` referenced in `org.apache.spark.sql.connect.SparkSession` was relocated to `org/sparkproject/guava` (as configured in the parent `pom.xml`) instead of the desired `org/sparkproject/connect/guava`. We can verify this by unpacking the resulting jar and using the `grep` command:

```
grep -R "org/sparkproject/guava" *
Binary file tmp/org/apache/spark/connect/proto/SparkConnectServiceGrpc$SparkConnectServiceFutureStub.class matches
Binary file tmp/org/apache/spark/sql/connect/SparkSession$Builder.class matches
Binary file tmp/org/apache/spark/sql/connect/SparkSession$.class matches
Binary file tmp/org/apache/spark/sql/connect/SparkSession$$anon$1.class matches
```

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
- Pass Git Hub Acitons
- build a client using dev/make-distribution.sh --tgz -Phive with this pr, checked `bin/spark-shell --remote local`

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50401 from LuciferYang/connect-combin-self-override.

Authored-by: yangjie01 <yangjie01@baidu.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 57cf2360bcb2517eb6755842bbc52a52bffc1c03)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by yangjie01 on 2025-03-26T15:55:47Z)
- af32c0c: [SPARK-51600][CORE] Prepend classes of `sql/hive` and `sql/hive-thriftserver`  when `isTesting || isTestingSql` is true

### What changes were proposed in this pull request?
This pr aims to add a condition check for `isTesting || isTestingSql` to `shouldPrePendSparkHive` and `shouldPrePendSparkHiveThriftServer`.  When running Maven tests, prepend classes should be performed for "sql/hive" and "sql/hive-thriftserver" modules.

### Why are the changes needed?
After SPARK-49534 was merged, when `spark-hive_xxx.jar` is not present in the `assembly/target/scala-2.13/jars` directory, prepend classes will no longer be executed for `sql/hive`. Similar handling has been applied to `sql/hive-thriftserver`.

Although this resolves the issue described in https://github.com/apache/spark/pull/48015, it introduces another problem:

When we execute `mvn test`, if the dependent JARs are not pre-collected into the `assembly/target/scala-2.13/jars` directory and we directly run Maven tests on the `sql/hive` and `sql/hive-thriftserver` modules, some tests will fail.

Consider the following testing approach:

```
build/mvn clean -Phive -Phive-thriftserver
build/mvn clean install -DskipTests -pl sql/hive-thriftserver -am -Phive -Phive-thriftserver
build/mvn clean install -pl sql/hive-thriftserver -Phive -Phive-thriftserver
build/mvn clean install -pl sql/hive -Phive
```

The tests for the `sql/hive-thriftserver` module  *** RUN ABORTED *** due to the following reasons:

```
HiveThriftBinaryServerSuite:
18:48:19.595 ERROR org.apache.spark.sql.hive.thriftserver.HiveThriftBinaryServerSuite:
=====================================
HiveThriftServer2Suite failure output
=====================================

### Attempt 0 ###
HiveThriftServer2 command line: ArraySeq(../../sbin/start-thriftserver.sh, --master, local, --hiveconf, javax.jdo.option.ConnectionURL=jdbc:derby:;databaseName=/home/runner/work/spark/spark/sql/hive-thriftserver/target/tmp/spark-2bca44a3-c220-485c-b2a4-289262293652;create=true, --hiveconf, hive.metastore.warehouse.dir=/home/runner/work/spark/spark/sql/hive-thriftserver/target...

18:48:22.634 WARN org.apache.spark.sql.hive.thriftserver.HiveThriftBinaryServerSuite:

===== POSSIBLE THREAD LEAK IN SUITE o.a.s.sql.hive.thriftserver.HiveThriftBinaryServerSuite, threads: Thread-10 (daemon=true), Thread-11 (daemon=true) =====

*** RUN ABORTED ***
An exception or error caused a run to abort: Future timed out after [3 minutes]
  java.util.concurrent.TimeoutException: Future timed out after [3 minutes]
  at scala.concurrent.impl.Promise$DefaultPromise.tryAwait0(Promise.scala:248)
  at scala.concurrent.impl.Promise$DefaultPromise.result(Promise.scala:261)
  at org.apache.spark.util.SparkThreadUtils$.awaitResultNoSparkExceptionConversion(SparkThreadUtils.scala:61)
  at org.apache.spark.util.SparkThreadUtils$.awaitResult(SparkThreadUtils.scala:45)
  at org.apache.spark.util.ThreadUtils$.awaitResult(ThreadUtils.scala:342)
  at org.apache.spark.sql.hive.thriftserver.HiveThriftServer2TestBase.startThriftServer(HiveThriftServer2Suites.scala:1345)
  at org.apache.spark.sql.hive.thriftserver.HiveThriftServer2TestBase.$anonfun$beforeAll$4(HiveThriftServer2Suites.scala:1403)
  at scala.runtime.java8.JFunction0$mcV$sp.apply(JFunction0$mcV$sp.scala:18)
  at scala.util.Try$.apply(Try.scala:217)
  at org.apache.spark.sql.hive.thriftserver.HiveThriftServer2TestBase.$anonfun$beforeAll$3(HiveThriftServer2Suites.scala:1402)
  ...

```

```
Error: Failed to load class org.apache.spark.sql.hive.thriftserver.HiveThriftServer2.
Failed to load main class org.apache.spark.sql.hive.thriftserver.HiveThriftServer2.
```

`HiveSparkSubmitSuite` will have 15 failed tests due to the following reasons:

```
Exception in thread "main" java.lang.NoClassDefFoundError: org/apache/spark/sql/hive/HiveUtils$
  	at org.apache.spark.sql.hive.SetMetastoreURLTest$.main(HiveSparkSubmitSuite.scala:390)
  	at org.apache.spark.sql.hive.SetMetastoreURLTest.main(HiveSparkSubmitSuite.scala)
  	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
  	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
  	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
  	at java.base/java.lang.reflect.Method.invoke(Method.java:569)
  	at org.apache.spark.deploy.JavaMainApplication.start(SparkApplication.scala:52)
  	at org.apache.spark.deploy.SparkSubmit.org$apache$spark$deploy$SparkSubmit$$runMain(SparkSubmit.scala:1027)
  	at org.apache.spark.deploy.SparkSubmit.doRunMain$1(SparkSubmit.scala:204)
  	at org.apache.spark.deploy.SparkSubmit.submit(SparkSubmit.scala:227)
  	at org.apache.spark.deploy.SparkSubmit.doSubmit(SparkSubmit.scala:96)
  	at org.apache.spark.deploy.SparkSubmit$$anon$2.doSubmit(SparkSubmit.scala:1132)
  	at org.apache.spark.deploy.SparkSubmit$.main(SparkSubmit.scala:1141)
  	at org.apache.spark.deploy.SparkSubmit.main(SparkSubmit.scala)
  Caused by: java.lang.ClassNotFoundException: org.apache.spark.sql.hive.HiveUtils$
  	at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:641)
  	at java.base/jdk.internal.loader.ClassLoaders$AppClassLoader.loadClass(ClassLoaders.java:188)
  	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:525)
  	... 14 more

```

The reason why the issue is not triggered by the Maven daily test is that a full build is executed before the test, which completes the process of collecting JARs into the `assembly/target/scala-2.13/jars` directory.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
- Pass GitHub Actions
- Pass Maven test: https://github.com/LuciferYang/spark/runs/39370781864

![image](https://github.com/user-attachments/assets/a8ad2c08-b970-4ccf-81c5-b98430a0ab4a)

- re-check the test in https://github.com/apache/spark/pull/48015, the changes in this pr will not break it.

- Locally test

```
build/mvn clean -Phive -Phive-thriftserver
build/mvn clean install -DskipTests -pl sql/hive-thriftserver -am -Phive -Phive-thriftserver
build/mvn clean install -pl sql/hive-thriftserver -Phive -Phive-thriftserver
build/mvn clean install -pl sql/hive -Phive
```

**sql/hive-thriftserver**

```
Run completed in 12 minutes, 55 seconds.
Total number of tests run: 640
Suites: completed 20, aborted 0
Tests: succeeded 640, failed 0, canceled 0, ignored 26, pending 0
All tests passed.
```

**sql/hive**

```
Run completed in 1 hour, 17 minutes, 15 seconds.
Total number of tests run: 3987
Suites: completed 148, aborted 0
Tests: succeeded 3987, failed 0, canceled 2, ignored 606, pending 0
All tests passed.
```

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50385 from LuciferYang/SPARK-51600-2.

Authored-by: yangjie01 <yangjie01@baidu.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit b5f9a2880bb63a55912d153349c224f2ffc115fe)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by yangjie01 on 2025-03-26T15:58:27Z)
- 6c2fc5d: [SPARK-42746][SQL][FOLLOWUP][4.0] Regen golden files for LISTAGG

### What changes were proposed in this pull request?
Fixing golden files, as backport to from master had golden files regenerated with additional feature for CTEs.

### Why are the changes needed?
CIs are failing. https://github.com/apache/spark/actions/runs/14059194162/job/39365632364

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Test changes only.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50403 from mihailom-db/fixGolden.

Authored-by: Mihailo Milosevic <mihailo.milosevic@databricks.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by Mihailo Milosevic on 2025-03-26T16:00:35Z)
- aec9185: [SPARK-51525][DOCS][SQL] Desc As JSON test for top-level default collation field

### What changes were proposed in this pull request?

Add collation field to Desc As JSON docs

### Why are the changes needed?

Document support of collation in Desc As JSON

### Does this PR introduce _any_ user-facing change?

Yes, docs change

### How was this patch tested?

NA

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50404 from asl3/asl3/descasjson-collationdocs.

Authored-by: Amanda Liu <amanda.liu@databricks.com>
Signed-off-by: Gengliang Wang <gengliang@apache.org>
(cherry picked from commit 400b4d00ac175d87e9eacbdea055f9c9908566ea)
Signed-off-by: Gengliang Wang <gengliang@apache.org> (by Amanda Liu on 2025-03-26T18:04:49Z)
- d46fbe1: [SPARK-51118][TESTS][FOLLOWUP][4.0] Move test_udf_with_udt to BaseUDFTestsMixin

### What changes were proposed in this pull request?

This is a backport of #50392.

Move `test_udf_with_udt` to `BaseUDFTestsMixin`.

### Why are the changes needed?

These tests should be shared properly.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

The moved tests should pass.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50395 from ueshin/issues/SPARK-51118/4.0/test.

Lead-authored-by: Takuya Ueshin <ueshin@databricks.com>
Co-authored-by: Takuya UESHIN <ueshin@databricks.com>
Signed-off-by: Takuya Ueshin <ueshin@databricks.com> (by Takuya Ueshin on 2025-03-26T22:09:43Z)
- 22a545a: [SPARK-51612][SQL] Display Spark confs set at view creation in Desc As Json

### What changes were proposed in this pull request?

Include Spark confs captured at the time of view creation in `Desc As Json` output.

Example output (new field `view_creation_confs` at bottom):
```
{
  "table_name": "view",
  "catalog_name": "spark_catalog",
  "namespace": [
    "default"
  ],
  "schema_name": "default",
  "columns": [
    {
      "name": "id",
      "type": {
        "name": "int"
      },
      "nullable": true
    },
    {
      "name": "name",
      "type": {
        "name": "string",
        "collation": "UTF8_BINARY"
      },
      "nullable": true
    },
    {
      "name": "created_at",
      "type": {
        "name": "timestamp_ltz"
      },
      "nullable": true
    }
  ],
  "created_time": "2025-03-26T17:12:34Z",
  "last_access": "UNKNOWN",
  "created_by": "Spark 4.1.0-SNAPSHOT",
  "type": "VIEW",
  "view_text": "SELECT * FROM spark_catalog.ns.table",
  "view_original_text": "SELECT * FROM spark_catalog.ns.table",
  "view_schema_mode": "COMPENSATION",
  "view_catalog_and_namespace": "spark_catalog.default",
  "view_query_output_columns": [
    "id",
    "name",
    "created_at"
  ],
  // NEW
  "view_creation_confs": {
    "spark.sql.ansi.enabled": "true",
    "spark.sql.session.timeZone": "America/Los_Angeles",
    "spark.sql.legacy.useV1Command": "false",
    "spark.sql.parquet.fieldId.read.enabled": "true"
  }
}
```

### Why are the changes needed?

Add a new field which uses the existing CatalogTable `viewSQLConfigs` to surface information about Spark conf settings at view creation to users

### Does this PR introduce _any_ user-facing change?

Yes, adds a new field to Desc As Json

### How was this patch tested?

Added test for desc view as json

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50407 from asl3/asl3/describeviewconf.

Authored-by: Amanda Liu <amanda.liu@databricks.com>
Signed-off-by: Gengliang Wang <gengliang@apache.org>
(cherry picked from commit 07c1dedae5cbd58b9eec38428e563a3461399206)
Signed-off-by: Gengliang Wang <gengliang@apache.org> (by Amanda Liu on 2025-03-26T22:26:08Z)
- 88186e1: [SPARK-51318][BUILD] Remove test jars in source releases

### What changes were proposed in this pull request?

This PR proposes to remove test jars in source releases during release process.

### Why are the changes needed?

Apache source releases must not contained jar files.
The issue is discussed on https://lists.apache.org/thread/0ro5yn6lbbpmvmqp2px3s2pf7cwljlc4

### Does this PR introduce _any_ user-facing change?

To end users, no.

### How was this patch tested?

Manually tested, and I will work together with release manager to make sure this wroks.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50378 from HyukjinKwon/SPARK-51318.

Lead-authored-by: Hyukjin Kwon <gurwls223@apache.org>
Co-authored-by: Vlad Rozov <vrozov@amazon.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit b829aeab4f74659356a9daff02ce7ffbec5d6943)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-26T23:25:27Z)
- 5d2c17b: [SPARK-51617][BUILD] Explicitly commit/revert jar removals

### What changes were proposed in this pull request?

This PR explicitly commit/revert jar removals in the release process.

### Why are the changes needed?

To explicitly record the removals in commit history.

### Does this PR introduce _any_ user-facing change?

No, dev-only.

### How was this patch tested?

I manually tested individual commands. I will work together with release manager to verify this.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50415 from HyukjinKwon/SPARK-51617.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 0d2a06be7747a32586b6d7d570abb67c56b26f37)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-27T00:49:29Z)
- ac168ab: [SPARK-51573][SS] Fix Streaming State Checkpoint v2 checkpointInfo race condition

Return StateStoreCheckpointInfo as part of RocksDB.commit() and store it locally in the RocksDBStateStore so that RocksDBStateStore.getCheckpointInfo() always returns the checkpoint info belonging to its commit.

Fixes the bug explained in SPARK-51573. This race condition will result in tasks getting incorrect checkpointInfo which is a correctness bug.

No.

Added new unit test.

No.

Closes #50344 from liviazhu-db/liviazhu-db/checkpointinfo-race.

Authored-by: Livia Zhu <livia.zhu@databricks.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 4765c15a442ee92022b28398ba52136b8e05082d)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Livia Zhu on 2025-03-27T03:24:39Z)
- 6ae3f90: [SPARK-51605][CONNECT] Try to create the parent directory before touching the logFile

### What changes were proposed in this pull request?
This PR try to create the parent directory before touching the log file in `connect.SparkSession.withLocalConnectServer` to avoid issues when the parent directory does not exist.

### Why are the changes needed?
When the `logs` directory does not exist under the `SPARK_HOME` path, executing `bin/spark-shell --remote local` will result in the following error:

```
bin/spark-shell --remote local
WARNING: Using incubator modules: jdk.incubator.vector
Exception in thread "main" java.nio.file.NoSuchFileException: /Users/yangjie01/Tools/spark-4.1.0-SNAPSHOT-bin-3.4.1/logs
  at java.base/sun.nio.fs.UnixException.translateToIOException(UnixException.java:92)
  at java.base/sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:106)
  at java.base/sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:111)
  at java.base/sun.nio.fs.UnixFileAttributeViews$Basic.readAttributes(UnixFileAttributeViews.java:55)
  at java.base/sun.nio.fs.UnixFileSystemProvider.readAttributes(UnixFileSystemProvider.java:148)
  at java.base/java.nio.file.Files.readAttributes(Files.java:1851)
  at java.base/sun.nio.fs.PollingWatchService.doPrivilegedRegister(PollingWatchService.java:173)
  at java.base/sun.nio.fs.PollingWatchService$2.run(PollingWatchService.java:154)
  at java.base/sun.nio.fs.PollingWatchService$2.run(PollingWatchService.java:151)
  at java.base/java.security.AccessController.doPrivileged(AccessController.java:569)
  at java.base/sun.nio.fs.PollingWatchService.register(PollingWatchService.java:150)
  at java.base/sun.nio.fs.UnixPath.register(UnixPath.java:885)
  at java.base/java.nio.file.Path.register(Path.java:894)
  at org.apache.spark.sql.connect.SparkSession$.waitUntilFileExists(SparkSession.scala:717)
  at org.apache.spark.sql.connect.SparkSession$.$anonfun$withLocalConnectServer$13(SparkSession.scala:798)
  at org.apache.spark.sql.connect.SparkSession$.$anonfun$withLocalConnectServer$13$adapted(SparkSession.scala:791)
  at scala.Option.foreach(Option.scala:437)
  at org.apache.spark.sql.connect.SparkSession$.withLocalConnectServer(SparkSession.scala:791)
  at org.apache.spark.sql.application.ConnectRepl$.doMain(ConnectRepl.scala:67)
  at org.apache.spark.sql.application.ConnectRepl$.main(ConnectRepl.scala:57)
  at org.apache.spark.sql.application.ConnectRepl.main(ConnectRepl.scala)
  at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
  at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
  at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
  at java.base/java.lang.reflect.Method.invoke(Method.java:569)
  at org.apache.spark.deploy.JavaMainApplication.start(SparkApplication.scala:52)
  at org.apache.spark.deploy.SparkSubmit.org$apache$spark$deploy$SparkSubmit$$runMain(SparkSubmit.scala:1027)
  at org.apache.spark.deploy.SparkSubmit.doRunMain$1(SparkSubmit.scala:204)
  at org.apache.spark.deploy.SparkSubmit.submit(SparkSubmit.scala:227)
  at org.apache.spark.deploy.SparkSubmit.doSubmit(SparkSubmit.scala:96)
  at org.apache.spark.deploy.SparkSubmit$$anon$2.doSubmit(SparkSubmit.scala:1132)
  at org.apache.spark.deploy.SparkSubmit$.main(SparkSubmit.scala:1141)
  at org.apache.spark.deploy.SparkSubmit.main(SparkSubmit.scala)
25/03/26 15:39:40 INFO ShutdownHookManager: Shutdown hook called
25/03/26 15:39:40 INFO ShutdownHookManager: Deleting directory /private/var/folders/j2/cfn7w6795538n_416_27rkqm0000gn/T/spark-fe4c9d71-b7d7-437e-b486-514cc538cccc
```

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
- Pass GitHub Acitons
- Manual Check:

1. Package a Spark Client using the command `dev/make-distribution.sh --tgz -Phive`.
2. Execute `bin/spark-shell --remote local`. Although the logs directory does not exist, the aforementioned error is no longer reported.
3. After exiting the Connect REPL, execute `bin/spark-shell --remote local` again. At this point, the logs directory already exists, and the shell will start successfully. (Due to the unresolved issue SPARK-51606, it is necessary to manually kill the Connect Server process after exiting the Connect REPL.)

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50421 from LuciferYang/SPARK-51605.

Authored-by: yangjie01 <yangjie01@baidu.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 09e726d3658f4ee6f2e96375db9b5551165d5a36)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by yangjie01 on 2025-03-27T05:06:09Z)
- be3cd43: [SPARK-51624][SQL] Propagate GetStructField metadata in CreateNamedStruct.dataType

### What changes were proposed in this pull request?

This change intends to propagate GetStructField metadata in CreateNamedStruct.dataType.

### Why are the changes needed?

This is important because dataType comparisons are important for optimizer rules such as SimplifyCasts, which can cascade down to more expression optimizations.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Added unit test.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50412 from andylam-db/simplify-casts-comp.

Lead-authored-by: Andy Lam <andy.lam@databricks.com>
Co-authored-by: Wenchen Fan <cloud0fan@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 0f36edc2b9856a66eb184540eacd847fb1348220)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Andy Lam on 2025-03-27T07:44:23Z)
- de113f5: [SPARK-51625][SQL] Command in CTE relations should trigger inline

### What changes were proposed in this pull request?

This PR fixes a small issue in the rule `CTESubstitution`. The intention is to fall back to CTE inline if there are commands in the plan. However, the code simply does `plan.collect` which misses the fact that `UnresolvedWith` does not include the CTE relations in its children.

To fix it, we should do a manually recursion to handle the CTE relations.

### Why are the changes needed?

A potential bug as the code does not work as expected.

### Does this PR introduce _any_ user-facing change?

No, there is no user-facing API that can construct such a CTE plan.

### How was this patch tested?

a new test

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #50425 from cloud-fan/cte.

Authored-by: Wenchen Fan <wenchen@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 714884cb115f2520a8bf3a44d7529c21abbabf40)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Wenchen Fan on 2025-03-27T07:46:36Z)
- ff8f559: [SPARK-51623][BUILD] Remove class files in source releases

This PR proposes to remove test class files in source releases during release process.

Apache source releases must not contained class files.
The issue is discussed on https://lists.apache.org/thread/0ro5yn6lbbpmvmqp2px3s2pf7cwljlc4

To end users, no.

Will be tested in CI.

No.

Closes #50422 from HyukjinKwon/SPARK-51623.

Lead-authored-by: Hyukjin Kwon <gurwls223@apache.org>
Co-authored-by: Hyukjin Kwon <gurwls223@gmail.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 0528ac76144a0a56a48c238582c6dc100a04e00b)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-27T08:42:59Z)
- c4022ad: [SPARK-50657][DOCS][FOLLOW-UP] Fix the recommended pyarrow version

### What changes were proposed in this pull request?
Change the recommended pyarrow version to 11

### Why are the changes needed?
since spark 4.0, pyarrow=10 is no longer supported and fail some tests

### Does this PR introduce _any_ user-facing change?
doc only

### How was this patch tested?
ci

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50432 from zhengruifeng/doc_update_pyarrow.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org>
(cherry picked from commit edb28887cb3a5c87dbc19d7131117b46706c55fc)
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by Ruifeng Zheng on 2025-03-28T01:09:54Z)
- 33d77a0: [SPARK-51606][CONNECT] Add SPARK_IDENT_STRING when stopping Spark Connect server

### What changes were proposed in this pull request?

This PR proposes to add `SPARK_IDENT_STRING` when stopping Spark Connect server so the local Connect server can be stopped properly via `./sbin/stop-connect-server.sh`.

### Why are the changes needed?

So it can terminate Spark Connect server when the companion shell is terminated.

### Does this PR introduce _any_ user-facing change?

Not yet. The main change has not been released out yet.

### How was this patch tested?

Manually tested via repeated executions of Spark shells:

```bash
./bin/spark-shell --remote local
```

stop

```bash
./bin/spark-shell --remote local
```

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50438 from HyukjinKwon/SPARK-51606.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 0fdff1bb24a41dd4c712f1cb9800c651449c8ba5)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by Hyukjin Kwon on 2025-03-28T03:41:07Z)
- 76836de: [SPARK-51603][CONNECT][TESTS] Auto ignore tests that require starting `SparkConnectServer` when the directory `assembly/target/scala-2.13/jars/` not exist

### What changes were proposed in this pull request?
After the merge of SPARK-48936 (https://github.com/apache/spark/pull/47402), the Maven module compilation order for the `connect-client-jvm` module was moved up to occur before the `assembly` build.

Since a portion of the tests in `connect-client-jvm` heavily rely on `SparkConnectServer` and related dependencies being collected into `assembly/target/scala-2.13/jars/`, it is necessary to build `assembly` before running `mvn test` for `connect-client-jvm`.

For example:

```
build/mvn clean install -DskipTests -Phive
build/mvn test -pl sql/connect/client/jvm
```

This sequence will result in successful tests.

However, if a full test suite is executed directly, such as:

```
build/mvn clean install -Phive
```

Failures similar to the following may occur:

```
[ERROR] Tests run: 1, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.044 s <<< FAILURE! -- in org.apache.spark.sql.JavaEncoderSuite
[ERROR] org.apache.spark.sql.JavaEncoderSuite -- Time elapsed: 0.044 s <<< FAILURE!
java.lang.AssertionError: assertion failed: Fail to locate the target folder: '/Users/yangjie01/SourceCode/git/spark-maven/sql/connect/server/target'. SPARK_HOME='/Users/yangjie01/SourceCode/git/spark-maven'. Make sure the spark project jars has been built (e.g. using build/sbt package)and the env variable `SPARK_HOME` is set correctly.
  at scala.Predef$.assert(Predef.scala:279)
  at org.apache.spark.sql.connect.test.IntegrationTestUtils$.tryFindJar(IntegrationTestUtils.scala:138)
  at org.apache.spark.sql.connect.test.IntegrationTestUtils$.findJar(IntegrationTestUtils.scala:116)
  at org.apache.spark.sql.connect.test.SparkConnectServerUtils$.sparkConnect$lzycompute(RemoteSparkSession.scala:65)
  at org.apache.spark.sql.connect.test.SparkConnectServerUtils$.sparkConnect(RemoteSparkSession.scala:62)
  at org.apache.spark.sql.connect.test.SparkConnectServerUtils$.start(RemoteSparkSession.scala:135)
  at org.apache.spark.sql.connect.test.SparkConnectServerUtils$.createSparkSession(RemoteSparkSession.scala:181)
  at org.apache.spark.sql.connect.test.SparkConnectServerUtils.createSparkSession(RemoteSparkSession.scala)
  at org.apache.spark.sql.JavaEncoderSuite.setup(JavaEncoderSuite.java:42)
  at java.base/java.lang.reflect.Method.invoke(Method.java:569)
  at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
  Suppressed: java.lang.NullPointerException: Cannot invoke "org.apache.spark.sql.SparkSession.stop()" because "org.apache.spark.sql.JavaEncoderSuite.spark" is null
    at org.apache.spark.sql.JavaEncoderSuite.tearDown(JavaEncoderSuite.java:47)
    at java.base/java.lang.reflect.Method.invoke(Method.java:569)
    at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
    at java.base/java.util.Collections$UnmodifiableCollection.forEach(Collections.java:1092)
    ... 1 more

[INFO]
[INFO] Results:
[INFO]
[ERROR] Failures:
[ERROR]   JavaEncoderSuite.setup:42 assertion failed: Fail to locate the target folder: '/Users/yangjie01/SourceCode/git/spark-maven/sql/connect/server/target'. SPARK_HOME='/Users/yangjie01/SourceCode/git/spark-maven'. Make sure the spark project jars has been built (e.g. using build/sbt package)and the env variable `SPARK_HOME` is set correctly.
[INFO]
[ERROR] Tests run: 1, Failures: 1, Errors: 0, Skipped: 0
```

To ensure that the above failing scenario can be tested successfully, the current pr makes the following changes:

1. Added `isAssemblyJarsDirExists` in `IntegrationTestUtils` to check if the directory `assembly/target/scala-2.13/jars/` exists.
2. Overrode the `test` function in the `trait RemoteSparkSession` from `AnyFunSuite` to ignore corresponding tests when `isAssemblyJarsDirExists` is `false`. Additionally, `RemoteSparkSession` will only try to start `SparkConnectServer` when `isAssemblyJarsDirExists` is `true`.
3. Made similar changes in `JavaEncoderSuite` as in step 2

### Why are the changes needed?
Make the Maven testing process smoother.

### Does this PR introduce _any_ user-facing change?
No, just for maven test.

### How was this patch tested?
- Pass Git Hub Actions
- Tested the  `connect-client-jvm` module using Maven without `assembly` dir , and the results met expectations.

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50396 from LuciferYang/SPARK-51603.

Lead-authored-by: yangjie01 <yangjie01@baidu.com>
Co-authored-by: YangJie <yangjie01@baidu.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 38a195876bb7114c52bbe48c197543a4ec99b9c7)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by yangjie01 on 2025-03-28T03:56:14Z)
- b8f08df: [MINOR][DOCS] Fix variable name typo in document

### What changes were proposed in this pull request?

Fix variable name typo in document

### Why are the changes needed?

For doc

### Does this PR introduce _any_ user-facing change?

Yes

### How was this patch tested?

No

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50443 from Mrhs121/typo.

Authored-by: ShengHuang <huangshengtx@163.com>
Signed-off-by: Kent Yao <yao@apache.org>
(cherry picked from commit 1dfb04666ddccfc612a9b1c51703208bc917755e)
Signed-off-by: Kent Yao <yao@apache.org> (by ShengHuang on 2025-03-28T09:11:28Z)
- 8914bc0: [SPARK-51616][SQL] Run CollationTypeCasts before ResolveAliases and ResolveAggregateFunctions

Run `CollationTypeCasts` before `ResolveAliases` and `ResolveAggregateFunctions` to get correct alias names to collated expression trees.

This is a better (alternative) solution for https://github.com/apache/spark/pull/50192.

`ReassignAliasNamesWithCollations` changes `Alias` names only cosmetically. Name resolution is still done in the main Analyzer batch based on the old names. For example, users would still be able to reference expressions using old alias names without `collate` information.

A better solution would be to run `CollationTypeCasts` manually In the rules that generate `Alias`es.

No, just a different (better) way to do the same thing.

New golden file tests.

No.

Closes #50410 from vladimirg-db/vladimir-golubev_data/run-collation-type-coercion-before-regenerating-aliases.

Authored-by: Vladimir Golubev <vladimir.golubev@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit c9fbcb1c74cedda9400d9730d60428056ac0ef75)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Vladimir Golubev on 2025-03-28T15:29:36Z)
- d4754ba: [SPARK-51608][PYTHON] Log exception on Python runner termination

### What changes were proposed in this pull request?
There are situations, when python worker may throw exceptions that are not covered by any other kind of logging (for example custom implementation/unexpected throw from existing code)

In these situations it is hard to debug which exactly issue happened, as there is no stack trace in logs and no actual message from exception.

To address this issue exception is added for the logging call (rare exception situation while stopping python worker)

### Why are the changes needed?
To effectively debug rare situations with worker termination.

### Does this PR introduce _any_ user-facing change?
no

### How was this patch tested?
no need

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #49890 from antban/log-exception-on-worker-termination.

Lead-authored-by: dmitry.sorokin <dmitry.sorokin@databricks.com>
Co-authored-by: dsorokin <dmitry.sorokin@gmail.com>
Signed-off-by: Takuya Ueshin <ueshin@databricks.com>
(cherry picked from commit 28a756222800810868994c1cd6de09a9bf3d6584)
Signed-off-by: Takuya Ueshin <ueshin@databricks.com> (by dmitry.sorokin on 2025-03-28T20:13:20Z)
- 222385d: [SPARK-51645][SQL] Fix `CREATE OR REPLACE TABLE ... DEFAULT COLLATION ...` query

### What changes were proposed in this pull request?
Fixed `CREATE OR REPLACE TABLE ... DEFAULT COLLATION ...`. Problem was that ReplaceTable was not applicable to ResolveDDLCommandStringTypes rule, so default collation was not propagated to columns.

### Why are the changes needed?
Bug fix.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Tests added to `DefaultCollationTestSuite`.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50435 from ilicmarkodb/fix_create_or_replace_table_with_default_collation.

Authored-by: ilicmarkodb <marko.ilic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit c9733e0460a943d6feef7a6f5280f49f55787aaa)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by ilicmarkodb on 2025-03-30T12:39:43Z)
- ec0f089: [SPARK-51612][MINOR][FOLLOW-UP][SQL] Update Desc As JSON test to use withSQLConf

### What changes were proposed in this pull request?

Update Desc As JSON test to use `withSQLConf` to restore configs at end of test

### Why are the changes needed?

Ensure config settings in the test don't persist for other tests in the Spark session.

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Existing tests

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50419 from asl3/asl3/descasjson-withsqlconftest.

Authored-by: Amanda Liu <amanda.liu@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 73a3abae48ce0359bfc47e74fcec7517bd8ac6c3)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Amanda Liu on 2025-03-30T12:42:05Z)
- 8acf2cf: [SPARK-51665][BUILD] Truncate the lists in dev/test-jars.txt and dev/test-classes.txt during release process

### What changes were proposed in this pull request?

This PR is a sort of a followup of https://github.com/apache/spark/pull/50422 and https://github.com/apache/spark/pull/50378 that empty the list itself during the CI.

### Why are the changes needed?

Otherwise, the CI on the specific revert commit would fail (although the released commit itself would pass though)

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

I will work together with the release manager.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50458 from HyukjinKwon/SPARK-51665.

Authored-by: Hyukjin Kwon <gurwls223@apache.org>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit e4eded884472a3c2b850dc9b5fb0c06d0946a7d0)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Hyukjin Kwon on 2025-03-31T02:25:11Z)
- 98013d8: [SPARK-50994][SQL][FOLLOWUP] Do not use RDD with tracked execution in QueryTest

### What changes were proposed in this pull request?

This is a follow-up of https://github.com/apache/spark/pull/49678 . The intention of the test is to verify the deserialization to an RDD. We don't need to track the execution and trigger SQL execution events, which makes tests less stable.

### Why are the changes needed?

make tests more stable

### Does this PR introduce _any_ user-facing change?

no

### How was this patch tested?

N/A

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #50457 from cloud-fan/rdd.

Lead-authored-by: Wenchen Fan <wenchen@databricks.com>
Co-authored-by: Wenchen Fan <cloud0fan@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 4128d0b9e1a4477132c505d3bb23ec1aeb275217)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Wenchen Fan on 2025-03-31T11:04:39Z)
- 70e0e20: [SPARK-47895][SQL] group by alias should be idempotent

### What changes were proposed in this pull request?
This is a followup of https://github.com/apache/spark/pull/43797 . GROUP BY ALIAS has the same bug and this PR applies the same fix to GROUP BY ALIAS

### Why are the changes needed?
For advanced users or Spark plugins, they may manipulate the logical plans directly. We need to make the framework more reliable.

### Does this PR introduce _any_ user-facing change?
Yes, we will fix the error.

### How was this patch tested?
Test added.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50461 from mihailom-db/mihailom-db/fixGroupBy.

Authored-by: Mihailo Milosevic <mihailo.milosevic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 02db87282dabca112b0d688560064f8b71e63d18)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Mihailo Milosevic on 2025-03-31T13:44:38Z)
- 808837f: [SPARK-51672][SQL] Regenerate golden files with collation aliases in branch-4.0

### What changes were proposed in this pull request?

Regenerate golden files with collation aliases in branch-4.0

### Why are the changes needed?

Leftover changes to 4.0 from https://github.com/apache/spark/pull/50410, because auto-generated aliases in `Aggregate` are still computed using `Expression.toString` there.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Golden files were regenerated.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50467 from vladimirg-db/vladimir-golubev_data/fix-collation-aliases-in-golden-files.

Authored-by: Vladimir Golubev <vladimir.golubev@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Vladimir Golubev on 2025-03-31T13:52:52Z)
- 136afb1: [SPARK-51667][SS][PYTHON] Disable Nagle's algorithm (via TCP_NODELAY = true) in TWS + PySpark for python <-> state server

### What changes were proposed in this pull request?

This PR proposes to disable Nagle's algorithm (TCP_NODELAY = true) for the connection between Python worker and state server, in TWS + PySpark.

### Why are the changes needed?

We have observed the consistent latency increment, which is almost slightly more than 40ms, from specific state interactions. e.g. ListState.put() / ListState.get() / ListState.appendList().

The root cause is figured out as the bad combination of Nagle's algorithm and delayed ACK. The sequence is following:

1. Python worker sends the proto message to JVM, and flushes the socket.
2. Additionally, Python worker sends the follow-up data to JVM, and flushes the socket.
3. JVM reads the proto message, and realizes there is follow-up data.
4. JVM reads the follow-up data.
5. JVM processes the request, and sends the response back to Python worker.

Due to delayed ACK, even after 3, ACK is not sent back from JVM to Python worker. It is waiting for some data or multiple ACKs to be sent, but JVM is not going to send the data during that phase.

Due to Nagle's algorithm, the message from 2 is not sent to JVM since there is no ACK for the message from 1. (There is in-flight unacknowledged message.)

This deadlock situation is resolved after the timeout of delayed ACK, which is 40ms (minimum duration) in Linux. After the timeout, ACK is sent back from JVM to Python worker, hence Nagle's algorithm allows the message from 2 to be finally sent to JVM.

The direction can be flipped depending on the command - the same thing can happen on the opposite direction of communication, JVM to Python worker.

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

Manually tested (via adding debug log to measure the time spent from the state interaction).

Beyond that, this should pass the existing tests, which will be verified by CI.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50460 from HeartSaVioR/SPARK-51667.

Authored-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit a760df7b84349974b9565df035b58ee92f82d9db)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Jungtaek Lim on 2025-03-31T21:53:32Z)
- e106766: [SPARK-51650][ML][CONNECT] Support delete ml cached objects in batch

### What changes were proposed in this pull request?
Support delete ml cached objects in batch

### Why are the changes needed?
to save RPCs

meta algorithms in client side may generate/delete many models, e.g. `CrossValidator`.
Existing implementation will have to delete them on by one, while with this change, they can be deleted in batch.

### Does this PR introduce _any_ user-facing change?
no

### How was this patch tested?
existing tests

### Was this patch authored or co-authored using generative AI tooling?
no

Closes #50441 from zhengruifeng/ml_connect_batch_del.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org>
(cherry picked from commit c83b88a037eee12f485498704fe587c76e69e8d3)
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by Ruifeng Zheng on 2025-04-01T01:08:36Z)
- 9b08924: [SPARK-51657] UTF8_BINARY default table collation shown by default in Desc As JSON (v1)

### What changes were proposed in this pull request?

Display `UTF8_BINARY` default table collation by default in Desc As JSON for v1 table.

Note this only affects the `desc as json` output and not `desc table extended` -- desc table does NOT always show the top-level table collation (if omitted in the`desc table` output, it is `UTF8_BINARY`)

### Why are the changes needed?

If the CatalogTable `collation` property is None, then it is by default `UTF8_BINARY`. This update is for completeness for the `desc as json` output.

### Does this PR introduce _any_ user-facing change?

Yes, affects the JSON result

### How was this patch tested?

Added tests in `v1/DescribeTableSuite.scala`

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50451 from asl3/asl3/descasjson-defaultcollation.

Authored-by: Amanda Liu <amanda.liu@databricks.com>
Signed-off-by: Gengliang Wang <gengliang@apache.org>
(cherry picked from commit 13945c84731f163b20c3f21fe351242dc2f9dd91)
Signed-off-by: Gengliang Wang <gengliang@apache.org> (by Amanda Liu on 2025-04-01T03:52:38Z)
- 034a1d4: [SPARK-51537][CONNECT][CORE] construct the session-specific classloader based on the default session classloader on executor

This PR is to construct the session-specific classloader based on the default session classloader which has already added the global jars (e.g., added by `--jars` ) into the classpath on the executor side in the connect mode.

In Spark Connect mode, when connecting to a non-local (e.g., standalone) cluster, the executor creates an isolated session state that includes a session-specific classloader for each task. However, a notable issue arises: this session-specific classloader does not include the global JARs specified by the --jars option in the classpath. This oversight can lead to deserialization exceptions. For example:

``` console
Caused by: java.lang.ClassCastException: cannot assign instance of java.lang.invoke.SerializedLambda to field org.apache.spark.rdd.MapPartitionsRDD.f of type scala.Function3 in instance of org.apache.spark.rdd.MapPartitionsRDD
        at java.io.ObjectStreamClass$FieldReflector.setObjFieldValues(ObjectStreamClass.java:2096)
```

No

The newly added test can pass. And the below manual test can pass,

1. clone the minimum project that could repro this issue

``` shell
git clone gitgithub.com:wbo4958/ConnectMLIssue.git
```

2. Compile the project

```shell
mvn clean package
```

3. Start a standalone cluster

```shell
$SPARK_HOME/sbin/start-master.sh -h localhost
$SPARK_HOME/sbin/start-worker.sh spark://localhost:7077
```

4. Start a connect server connecting to the spark standalone cluster

```
./standalone.sh
```

5. Play around the demo

Running the below code under the pyspark client environment.

```shell
python repro-issue.py
```

Without this PR, you're going to see the below exception

``` console
Caused by: java.lang.ClassCastException: cannot assign instance of java.lang.invoke.SerializedLambda to field org.apache.spark.rdd.MapPartitionsRDD.f of type scala.Function3 in instance of org.apache.spark.rdd.MapPartitionsRDD
	at java.io.ObjectStreamClass$FieldReflector.setObjFieldValues(ObjectStreamClass.java:2096)
	at java.io.ObjectStreamClass$FieldReflector.checkObjectFieldValueTypes(ObjectStreamClass.java:2060)
	at java.io.ObjectStreamClass.checkObjFieldValueTypes(ObjectStreamClass.java:1347)
	at java.io.ObjectInputStream$FieldValues.defaultCheckFieldValues(ObjectInputStream.java:2679)
	at java.io.ObjectInputStream.readSerialData(ObjectInputStream.java:2486)
	at java.io.ObjectInputStream.readOrdinaryObject(ObjectInputStream.java:2257)
	at java.io.ObjectInputStream.readObject0(ObjectInputStream.java:1733)
	at java.io.ObjectInputStream$FieldValues.<init>(ObjectInputStream.java:2606)
	at java.io.ObjectInputStream.readSerialData(ObjectInputStream.java:2457)
	at java.io.ObjectInputStream.readOrdinaryObject(ObjectInputStream.java:2257)
	at java.io.ObjectInputStream.readObject0(ObjectInputStream.java:1733)
	at java.io.ObjectInputStream.readObject(ObjectInputStream.java:509)
	at java.io.ObjectInputStream.readObject(ObjectInputStream.java:467)
	at org.apache.spark.serializer.JavaDeserializationStream.readObject(JavaSerializer.scala:88)
	at org.apache.spark.serializer.JavaSerializerInstance.deserialize(JavaSerializer.scala:136)
	at org.apache.spark.scheduler.ResultTask.runTask(ResultTask.scala:86)
	at org.apache.spark.TaskContext.runTaskWithListeners(TaskContext.scala:171)
	at org.apache.spark.scheduler.Task.run(Task.scala:147)
	at org.apache.spark.executor.Executor$TaskRunner.$anonfun$run$5(Executor.scala:645)
	at org.apache.spark.util.SparkErrorUtils.tryWithSafeFinally(SparkErrorUtils.scala:80)
	at org.apache.spark.util.SparkErrorUtils.tryWithSafeFinally$(SparkErrorUtils.scala:77)
	at org.apache.spark.util.Utils$.tryWithSafeFinally(Utils.scala:100)
	at org.apache.spark.executor.Executor$TaskRunner.run(Executor.scala:648)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:635)
	at java.lang.Thread.run(Thread.java:840)
```

No

Closes #50334 from wbo4958/connect-executor-classpath.

Authored-by: Bobby Wang <wbo4958@gmail.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 72bd563579658c421b2d329d69831e1f619a0811)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Bobby Wang on 2025-03-31T23:43:25Z)
- 5550bf0: [SPARK-51675][SS] Fix col family creation after opening local DB to avoid snapshot creation, if not necessary

### What changes were proposed in this pull request?
Fix col family creation after opening local DB to avoid snapshot creation, if not necessary

### Why are the changes needed?
Without this, we might force snapshot creation where its not required

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Fixed unit tests

```
[info] Run completed in 2 minutes, 1 second.
[info] Total number of tests run: 4
[info] Suites: completed 1, aborted 0
[info] Tests: succeeded 4, failed 0, canceled 0, ignored 0, pending 0
[info] All tests passed.
```

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50471 from anishshri-db/task/SPARK-51675.

Authored-by: Anish Shrigondekar <anish.shrigondekar@databricks.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit c0fbc6ba7d2d8866d4266bcdf75729c5c2decd40)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Anish Shrigondekar on 2025-04-01T06:42:49Z)
- 7b67f23: [SPARK-51666][CORE] Fix sparkStageCompleted executorRunTime metric calculation

### What changes were proposed in this pull request?

Fix sparkStageCompleted executorRunTime metric calculation:

In case of when a spark task uses multiple CPU’s, the CPU seconds should capture the total execution seconds across all CPU’s. i.e. if a stage set cpus-of-task to be 48, if we used 10 seconds on each CPU, the total CPU seconds for that stage should be 10 seconds X 1 Tasks X 48 CPU = 480 CPU-seconds. If another task only used 1 CPU then its total CPU seconds is 10 seconds X 1 CPU = 10 CPU-Seconds.

This is very important fix since spark introduces stage level scheduling (so that different stage tasks are configured with different number of CPUs) , without this fix, in stage level scheduling case, the metric calculation is wrong.

### Why are the changes needed?

Bugfix

### Does this PR introduce _any_ user-facing change?

No.

### How was this patch tested?

No.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50459 from WeichenXu123/SPARK-51666.

Authored-by: Weichen Xu <weichen.xu@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 4e5ed454fb292bc22cbdb6fc69b7de322e0afeff)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Weichen Xu on 2025-04-01T08:09:24Z)
- e562432: [SPARK-51668][SQL] Report metrics for failed writes to V2 data sources

### What changes were proposed in this pull request?

Always post driver metrics for data source V2 writes

### Why are the changes needed?

All metrics that have been collected are otherwise lost in case the command aborts

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Added new tests

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50413 from olaky/custom-metrics-reporting-when-commands-abort.

Authored-by: Ole Sasse <ole.sasse@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 6d606139d5787e1b41d75bd4886038b061a9deb0)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Ole Sasse on 2025-04-01T09:47:19Z)
- cbba800: [SPARK-51684][PYTHON][SS] Fix test failure in test_pandas_transform_with_state

### What changes were proposed in this pull request?

Fixed test failure in test_pandas_transform_with_state mentioned in https://github.com/apache/spark/pull/50349#issuecomment-2769393040

### Why are the changes needed?

To unblock Spark 4.0.0 release

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Test only change.

### Was this patch authored or co-authored using generative AI tooling?

Closes #50482 from bogao007/test-fix-list-state.

Authored-by: bogao007 <bo.gao@databricks.com>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org>
(cherry picked from commit 7cc72bd37804b12af58dfa389490a4da2d1a65ab)
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by bogao007 on 2025-04-02T00:45:38Z)
- 4d7639d: [SPARK-51333][ML][PYTHON][CONNECT] Unwrap `InvocationTargetException` thrown in `MLUtils.loadOperator`

### What changes were proposed in this pull request?

Currently, if model loading fails in `MLUtils.loadOperator`, it throws an [InvocationTargetException](https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/InvocationTargetException.html), which wraps an exception thrown by the method invoked.

As a followup of https://github.com/apache/spark/pull/50098, this PR unwraps InvocationTargetException thrown in `MLUtils.loadOperator`, to make it throws the correct exception.

### Why are the changes needed?

Existing error message is useless in debug.

### Does this PR introduce _any_ user-facing change?

Yes. For example,

```
from pyspark.ml.classification import LogisticRegression
LogisticRegression.load("invalid_location")
```

Before the PR, this codes throws
```
java.lang.reflect.InvocationTargetException
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:569)
	at org.apache.spark.sql.connect.ml.MLUtils$.loadOperator(MLUtils.scala:417)
	at org.apache.spark.sql.connect.ml.MLUtils$.loadTransformer(MLUtils.scala:438)
	at org.apache.spark.sql.connect.ml.MLHandler$.handleMlCommand(MLHandler.scala:247)
```

With this PR, it will throw the correct exception:
```
java.io.FileNotFoundException: File invalid_location/metadata does not exist
	at org.apache.hadoop.fs.RawLocalFileSystem.deprecatedGetFileStatus(RawLocalFileSystem.java:917)
	at org.apache.hadoop.fs.RawLocalFileSystem.getFileLinkStatusInternal(RawLocalFileSystem.java:1238)
	at org.apache.hadoop.fs.RawLocalFileSystem.getFileStatus(RawLocalFileSystem.java:907)
	at org.apache.hadoop.fs.FilterFileSystem.getFileStatus(FilterFileSystem.java:462)
	at org.apache.spark.sql.execution.streaming.FileStreamSink$.hasMetadata(FileStreamSink.scala:56)
	at org.apache.spark.sql.execution.datasources.DataSource.resolveRelation(DataSource.scala:381)
```

### How was this patch tested?

New test.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50478 from xi-db/ml-connect-unwrap-InvocationTargetException.

Authored-by: Xi Lyu <xi.lyu@databricks.com>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org>
(cherry picked from commit c202bb2c3799eb254e39753717a22c8e7ce86370)
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by Xi Lyu on 2025-04-02T00:50:22Z)
- d8bbbfa: revert '[SPARK-51333][ML][PYTHON][CONNECT] Unwrap InvocationTargetException thrown in MLUtils.loadOperator' from 4.0

revert https://github.com/apache/spark/pull/50478 from 4.0 due to compilation error

Closes #50485 from zhengruifeng/revert_4d7639dbefc193d31ace8744ab16fb1f2959c1a8.

Authored-by: Ruifeng Zheng <ruifengz@apache.org>
Signed-off-by: Ruifeng Zheng <ruifengz@apache.org> (by Ruifeng Zheng on 2025-04-02T01:35:19Z)
- eadecfb: [SPARK-51682][SS] State Store Checkpoint V2 should handle offset log ahead of commit log correctly

### What changes were proposed in this pull request?
When State Store Checkpoint format V2 is used, we always read back checkpoint ID from commit log, rather than when commit log matches offset log.

### Why are the changes needed?
Right now, there is a bug of reading checkpoint ID from commit log when the query restarts. If the offset log is ahead of commit log, it doesn't read it, and the tasks won't have checkpoint ID to recover from and the query will fail.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Add a unit test that will fail without the fix.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50480 from siying/checkpoint_v2_commit_read.

Authored-by: Siying Dong <dong.sy@gmail.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 5d71afc7ea0f7fbab9b0f6d85e589c3ac6bc8a78)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Siying Dong on 2025-04-02T05:18:50Z)
- a87fa83: [SPARK-51697][PYTHON][SS] Fix list state test failure in TransformWithStateInPandas

### What changes were proposed in this pull request?

Fix test failure in test_transform_with_state_in_pandas_list_state

### Why are the changes needed?

Unblock 4.0 release

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Test only change

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50501 from bogao007/4.0-list-state-fix.

Authored-by: bogao007 <bo.gao@databricks.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by bogao007 on 2025-04-03T00:46:09Z)
- 852299b: [SPARK-51677][CONNECT][TESTS] Refactor `ClientE2ETestSuite/SparkSessionE2ESuite` to prevent memory leaks related to Arrow

### What changes were proposed in this pull request?
This pr refactors the `ClientE2ETestSuite` and `SparkSessionE2ESuite` as follows to prevent memory leaks related to Arrow:

1. Replace `df.collectResult` with `df.withResult` to ensure that `SparkResult` is automatically closed after use.

https://github.com/apache/spark/blob/beb509fe6d79ada842e14ee7c4a7c55d874fd8b7/sql/connect/common/src/main/scala/org/apache/spark/sql/connect/Dataset.scala#L1230-L1236

2. Use a `try {} finally {}` block to ensure that `SparkResult#destructiveIterator` and `SparkResult#iterator` are closed after use.

### Why are the changes needed?
Prevent memory leaks related to Arrow in `ClientE2ETestSuite` and `SparkSessionE2ESuite`.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
- Pass GitHub Actions
- Locally check:

```
build/sbt clean "connect-client-jvm/test" -Phive -Dspark.debug.sc.jvm.client=true
```

**Before**

```
...
[info] ClientE2ETestSuite:
...
[info] - SPARK-50965: Multiple named and positional parameterized nodes in the parsed logical plan (39 milliseconds)
java.lang.IllegalStateException: Memory was leaked by query. Memory leaked: (12192)
Allocator(ROOT) 0/12192/6325056/9223372036854775807 (res/actual/peak/limit)

	at org.apache.arrow.memory.BaseAllocator.close(BaseAllocator.java:504)
	at org.apache.arrow.memory.RootAllocator.close(RootAllocator.java:27)
	at org.apache.spark.sql.connect.SparkSession.close(SparkSession.scala:632)
	at org.apache.spark.sql.SparkSession.stop(SparkSession.scala:783)
	at org.apache.spark.sql.connect.test.RemoteSparkSession.afterAll(RemoteSparkSession.scala:226)
	at org.apache.spark.sql.connect.test.RemoteSparkSession.afterAll$(RemoteSparkSession.scala:224)
	at org.apache.spark.sql.connect.ClientE2ETestSuite.afterAll(ClientE2ETestSuite.scala:51)
	at org.scalatest.BeforeAndAfterAll.$anonfun$run$1(BeforeAndAfterAll.scala:225)
	at org.scalatest.Status.$anonfun$withAfterEffect$1(Status.scala:377)
	at org.scalatest.Status.$anonfun$withAfterEffect$1$adapted(Status.scala:373)
	at org.scalatest.CompositeStatus.whenCompleted(Status.scala:962)
	at org.scalatest.Status.withAfterEffect(Status.scala:373)
	at org.scalatest.Status.withAfterEffect$(Status.scala:371)
	at org.scalatest.CompositeStatus.withAfterEffect(Status.scala:863)
	at org.scalatest.BeforeAndAfterAll.run(BeforeAndAfterAll.scala:224)
	at org.scalatest.BeforeAndAfterAll.run$(BeforeAndAfterAll.scala:208)
	at org.apache.spark.sql.connect.ClientE2ETestSuite.run(ClientE2ETestSuite.scala:51)
	at org.scalatest.tools.Framework.org$scalatest$tools$Framework$$runSuite(Framework.scala:321)
	at org.scalatest.tools.Framework$ScalaTestTask.execute(Framework.scala:517)
	at sbt.ForkMain$Run.lambda$runTest$1(ForkMain.java:414)
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:635)
	at java.base/java.lang.Thread.run(Thread.java:840)
...
[info] SparkSessionE2ESuite:
...
[info] - executeCommand (19 milliseconds)
java.lang.IllegalStateException: Memory was leaked by query. Memory leaked: (128000)
Allocator(ROOT) 0/128000/128032/9223372036854775807 (res/actual/peak/limit)

	at org.apache.arrow.memory.BaseAllocator.close(BaseAllocator.java:504)
	at org.apache.arrow.memory.RootAllocator.close(RootAllocator.java:27)
	at org.apache.spark.sql.connect.SparkSession.close(SparkSession.scala:632)
	at org.apache.spark.sql.SparkSession.stop(SparkSession.scala:783)
	at org.apache.spark.sql.connect.test.RemoteSparkSession.afterAll(RemoteSparkSession.scala:226)
	at org.apache.spark.sql.connect.test.RemoteSparkSession.afterAll$(RemoteSparkSession.scala:224)
	at org.apache.spark.sql.connect.SparkSessionE2ESuite.afterAll(SparkSessionE2ESuite.scala:38)
	at org.scalatest.BeforeAndAfterAll.$anonfun$run$1(BeforeAndAfterAll.scala:225)
	at org.scalatest.Status.$anonfun$withAfterEffect$1(Status.scala:377)
	at org.scalatest.Status.$anonfun$withAfterEffect$1$adapted(Status.scala:373)
	at org.scalatest.CompositeStatus.whenCompleted(Status.scala:962)
	at org.scalatest.Status.withAfterEffect(Status.scala:373)
	at org.scalatest.Status.withAfterEffect$(Status.scala:371)
	at org.scalatest.CompositeStatus.withAfterEffect(Status.scala:863)
	at org.scalatest.BeforeAndAfterAll.run(BeforeAndAfterAll.scala:224)
	at org.scalatest.BeforeAndAfterAll.run$(BeforeAndAfterAll.scala:208)
	at org.apache.spark.sql.connect.SparkSessionE2ESuite.run(SparkSessionE2ESuite.scala:38)
	at org.scalatest.tools.Framework.org$scalatest$tools$Framework$$runSuite(Framework.scala:321)
	at org.scalatest.tools.Framework$ScalaTestTask.execute(Framework.scala:517)
	at sbt.ForkMain$Run.lambda$runTest$1(ForkMain.java:414)
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:635)
	at java.base/java.lang.Thread.run(Thread.java:840)

```

**After**

The aforementioned logs no longer exist.

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50493 from LuciferYang/connect-memleak.

Authored-by: yangjie01 <yangjie01@baidu.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit ad0bc93fe6abb2d1a302f77741e41a6e754e428c)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by yangjie01 on 2025-04-03T02:40:28Z)
- 56bca49: [SPARK-51700][SS] Fix incorrect logging when no files are eligible for deletion in RocksDBFileManager

### What changes were proposed in this pull request?
Fix incorrect logging when no files are eligible for deletion in RocksDBFileManager

### Why are the changes needed?
Without this, when no files are eligible, we are logging the wrong(negative) value in the logs

```
25/04/01 20:16:23 INFO RocksDBFileManager StateStoreId(opId=0,partId=138,name=default): Skipping deleting files. Need at least 30 stale versions for batch deletion but found only -90.
```

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Existing unit tests

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50502 from anishshri-db/task/SPARK-51700.

Authored-by: Anish Shrigondekar <anish.shrigondekar@databricks.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit a222f78cc2ba8d565766a0d711fc864c3ab86579)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Anish Shrigondekar on 2025-04-03T06:16:42Z)
- 18ca91b: [SPARK-51707][CONNECT][TESTS] Handling of `IllegalStateException` with `Memory leaked` message in the `afterAll` of `RemoteSparkSession`

### What changes were proposed in this pull request?
This pr improves the `afterAll` method of `RemoteSparkSession`. When it catches an `IllegalStateException` containing the message "Memory leaked", the method now throws the exception directly instead of just logging it. This adjustment enhances the exception detection capability of the `SparkSession#close` method during the execution of the `RootAllocator#close` operation, enabling relevant test cases to capture potential memory leak issues more promptly.

### Why are the changes needed?
Automatically check for potential Arrow-related memory leaks in test cases related to `RemoteSparkSession`

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
- Pass GitHub Actions
- Locally test：revert fix of SPARK-51677 and run test with this pr

```
git revert ad0bc93fe6abb2d1a302f77741e41a6e754e428c
build/sbt "connect-client-jvm/test" -Phive
```

```
...
[info] org.apache.spark.sql.connect.SparkSessionE2ESuite *** ABORTED *** (3 seconds, 225 milliseconds)
[info]   java.lang.IllegalStateException: Memory was leaked by query. Memory leaked: (128000)
[info] Allocator(ROOT) 0/128000/128032/9223372036854775807 (res/actual/peak/limit)
[info]   at org.apache.arrow.memory.BaseAllocator.close(BaseAllocator.java:504)
[info]   at org.apache.arrow.memory.RootAllocator.close(RootAllocator.java:27)
[info]   at org.apache.spark.sql.connect.SparkSession.close(SparkSession.scala:632)
[info]   at org.apache.spark.sql.SparkSession.stop(SparkSession.scala:783)
[info]   at org.apache.spark.sql.connect.test.RemoteSparkSession.afterAll(RemoteSparkSession.scala:226)
[info]   at org.apache.spark.sql.connect.test.RemoteSparkSession.afterAll$(RemoteSparkSession.scala:224)
[info]   at org.apache.spark.sql.connect.SparkSessionE2ESuite.afterAll(SparkSessionE2ESuite.scala:38)
[info]   at org.scalatest.BeforeAndAfterAll.$anonfun$run$1(BeforeAndAfterAll.scala:225)
[info]   at org.scalatest.Status.$anonfun$withAfterEffect$1(Status.scala:377)
[info]   at org.scalatest.Status.$anonfun$withAfterEffect$1$adapted(Status.scala:373)
[info]   at org.scalatest.CompositeStatus.whenCompleted(Status.scala:962)
[info]   at org.scalatest.Status.withAfterEffect(Status.scala:373)
[info]   at org.scalatest.Status.withAfterEffect$(Status.scala:371)
[info]   at org.scalatest.CompositeStatus.withAfterEffect(Status.scala:863)
[info]   at org.scalatest.BeforeAndAfterAll.run(BeforeAndAfterAll.scala:224)
[info]   at org.scalatest.BeforeAndAfterAll.run$(BeforeAndAfterAll.scala:208)
[info]   at org.apache.spark.sql.connect.SparkSessionE2ESuite.run(SparkSessionE2ESuite.scala:38)
[info]   at org.scalatest.tools.Framework.org$scalatest$tools$Framework$$runSuite(Framework.scala:321)
[info]   at org.scalatest.tools.Framework$ScalaTestTask.execute(Framework.scala:517)
[info]   at sbt.ForkMain$Run.lambda$runTest$1(ForkMain.java:414)
[info]   at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
[info]   at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)
[info]   at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:635)
[info]   at java.base/java.lang.Thread.run(Thread.java:840)
...
[info] org.apache.spark.sql.connect.ClientE2ETestSuite *** ABORTED *** (41 seconds, 54 milliseconds)
[info]   java.lang.IllegalStateException: Memory was leaked by query. Memory leaked: (12192)
[info] Allocator(ROOT) 0/12192/6325056/9223372036854775807 (res/actual/peak/limit)
[info]   at org.apache.arrow.memory.BaseAllocator.close(BaseAllocator.java:504)
[info]   at org.apache.arrow.memory.RootAllocator.close(RootAllocator.java:27)
[info]   at org.apache.spark.sql.connect.SparkSession.close(SparkSession.scala:632)
[info]   at org.apache.spark.sql.SparkSession.stop(SparkSession.scala:783)
[info]   at org.apache.spark.sql.connect.test.RemoteSparkSession.afterAll(RemoteSparkSession.scala:226)
[info]   at org.apache.spark.sql.connect.test.RemoteSparkSession.afterAll$(RemoteSparkSession.scala:224)
[info]   at org.apache.spark.sql.connect.ClientE2ETestSuite.afterAll(ClientE2ETestSuite.scala:51)
[info]   at org.scalatest.BeforeAndAfterAll.$anonfun$run$1(BeforeAndAfterAll.scala:225)
[info]   at org.scalatest.Status.$anonfun$withAfterEffect$1(Status.scala:377)
[info]   at org.scalatest.Status.$anonfun$withAfterEffect$1$adapted(Status.scala:373)
[info]   at org.scalatest.CompositeStatus.whenCompleted(Status.scala:962)
[info]   at org.scalatest.Status.withAfterEffect(Status.scala:373)
[info]   at org.scalatest.Status.withAfterEffect$(Status.scala:371)
[info]   at org.scalatest.CompositeStatus.withAfterEffect(Status.scala:863)
[info]   at org.scalatest.BeforeAndAfterAll.run(BeforeAndAfterAll.scala:224)
[info]   at org.scalatest.BeforeAndAfterAll.run$(BeforeAndAfterAll.scala:208)
[info]   at org.apache.spark.sql.connect.ClientE2ETestSuite.run(ClientE2ETestSuite.scala:51)
[info]   at org.scalatest.tools.Framework.org$scalatest$tools$Framework$$runSuite(Framework.scala:321)
[info]   at org.scalatest.tools.Framework$ScalaTestTask.execute(Framework.scala:517)
[info]   at sbt.ForkMain$Run.lambda$runTest$1(ForkMain.java:414)
[info]   at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264)
[info]   at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)
[info]   at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:635)
[info]   at java.base/java.lang.Thread.run(Thread.java:840)
...
[info] Run completed in 3 minutes, 8 seconds.
[info] Total number of tests run: 1475
[info] Suites: completed 33, aborted 2
[info] Tests: succeeded 1475, failed 0, canceled 1, ignored 6, pending 0
[info] *** 2 SUITES ABORTED ***
[error] Error: Total 1479, Failed 0, Errors 2, Passed 1477, Ignored 6, Canceled 1
[error] Error during tests:
[error] 	org.apache.spark.sql.connect.ClientE2ETestSuite
[error] 	org.apache.spark.sql.connect.SparkSessionE2ESuite
```

It can be observed that after revert the relevant fixes for SPARK-51677, applying the current pr can expose memory leak issues during the testing process.

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50506 from LuciferYang/RemoteSparkSession-check-IllegalStateException-with-MemLeak.

Authored-by: yangjie01 <yangjie01@baidu.com>
Signed-off-by: yangjie01 <yangjie01@baidu.com>
(cherry picked from commit 510edd763b912a21883e8a0dbaa3f661fedec234)
Signed-off-by: yangjie01 <yangjie01@baidu.com> (by yangjie01 on 2025-04-03T08:45:59Z)
- 8e1840b: [SPARK-51675][SS][FOLLOW-UP] Clear internal maps on close to remove DB open dep in other places

### What changes were proposed in this pull request?
Clear internal maps on close to remove DB open dep in other places

### Why are the changes needed?
Refactor related change

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Verified that tests failed without db open check and not clearing the internal state.

```
===== POSSIBLE THREAD LEAK IN SUITE o.a.s.sql.execution.streaming.state.RocksDBSuite, threads: rpc-boss-3-1 (daemon=true), ForkJoinPool.commonPool-worker-2 (daemon=true), shuffle-boss-6-1 (daemon=true), ForkJoinPool.commonPool-worker-1 (daemon=true) =====
[info] Run completed in 11 seconds.
[info] Total number of tests run: 16
[info] Suites: completed 1, aborted 0
[info] Tests: succeeded 16, failed 0, canceled 0, ignored 0, pending 0
[info] All tests passed.
```

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50510 from anishshri-db/task/SPARK-51715.

Authored-by: Anish Shrigondekar <anish.shrigondekar@databricks.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 3ab0f2de54af19daf09450ccad4fe79dac075cab)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Anish Shrigondekar on 2025-04-04T01:41:17Z)
- 195b6eb: [SPARK-51646][SQL] Fix propagating collation in views with default collation

### What changes were proposed in this pull request?
Fixed propagating default collation to literals, subqueries, etc., in `CREATE VIEW ... DEFAULT COLLATION ...` query.
The issue was that the saved string used to construct the view did not include the `DEFAULT COLLATION` ... clause, resulting in the view being created without collation information.

### Why are the changes needed?
Bug fix.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Tests added to `DefaultCollationTestSuite`.

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50436 from ilicmarkodb/fix_subquery_literals_in_views_with_default_collation.

Authored-by: ilicmarkodb <marko.ilic@databricks.com>
Signed-off-by: Max Gekk <max.gekk@gmail.com>
(cherry picked from commit babb950a7fc79f6dd3558eb2bb35c1c7a6733d6a)
Signed-off-by: Max Gekk <max.gekk@gmail.com> (by ilicmarkodb on 2025-04-04T13:02:05Z)
- 6bf5161: [SPARK-50953][FOLLOW-UP] Allow whitespace/tab in variantGet paths

### What changes were proposed in this pull request?

This PR allows for whitespaces to be used in variantGet paths.

### Why are the changes needed?

JSON keys can have whitespaces and there needs to be a way to extract them.

### Does this PR introduce _any_ user-facing change?

Yes, it allows for a more diverse set of variant_get paths.

### How was this patch tested?

Unit tests.

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50484 from harshmotw-db/harsh-motwani_data/variant_get_path.

Authored-by: Harsh Motwani <harsh.motwani@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit ba7a537225a7891f3e0d650d4141ef7bb8d06368)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Harsh Motwani on 2025-04-05T13:39:32Z)
- 909f7ba: [SPARK-51079] Added constructor for ArrowSerializer for backward compatibility

### What changes were proposed in this pull request?

Previously, [PR](https://github.com/apache/spark/pull/49790) extends ArrowSerializer class to support large variable types in pandas UDF. This PR makes it more backward-compatible by adding a new constructor for cases where the flag for large variable is irrelevant (default to false).

### Why are the changes needed?
To achieve versionless in spark connect, we need to be careful about changing a client API in Scala. For example, the change of an interface like this could affect Scala UDF referring to this class (as it is part of the spark connect client package) but running with an older spark connect client.

### How was this patch tested?
N/A. It's a new constructor.

Closes #50513 from haiyangsun-db/SPARK-51079.

Authored-by: Haiyang Sun <75672016+haiyangsun-db@users.noreply.github.com>
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org>
(cherry picked from commit 75d80c7795ca71d24229010ab04ae740473126aa)
Signed-off-by: Hyukjin Kwon <gurwls223@apache.org> (by Haiyang Sun on 2025-04-07T01:16:34Z)
- e896843: [SPARK-51496][SQL][FOLLOW-UP] Preserve the case of DataSourceV2Relation option keys

### What changes were proposed in this pull request?
Preserve the case of the `DataSourceV2Relation` option keys when merging options.

### Why are the changes needed?
To be consistent with the command options for `mergeOptions`.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
Existing tests

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50487 from drexler-sky/followup.

Authored-by: Evan Wu <evan123wu@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 24e4000459599e4f9e7e33242e7a4f742396f872)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Evan Wu on 2025-04-07T13:53:41Z)
- 1e4dc0d: [SPARK-51724][SS] RocksDB StateStore's lineage manager should be synchronized

### Why are the changes needed?
RocksDB State Store's Lineage Manager currently isn't synchronized, but it can be accessed by both DB loading and maintenance thread. In theory, it can cause wrong lineage:
1. maintenance thread get current lineage
2. task commit() adds a lineage from the lienage
3. maintenance thread does the truncation and store it back

In this case, the new lineage added by 2. is lost.
It should be fixed by simply synchronizing those operations.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Run existing unit tests

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50520 from siying/lineagemanagerrace.

Authored-by: Siying Dong <dong.sy@gmail.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 187adb83fae9c8bb5f6e27fd121e457aabbb78b6)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by Siying Dong on 2025-04-08T13:14:54Z)
- ffbb1c1: [SPARK-51717][SS][ROCKSDB] Fix SST mismatch corruption that can happen for second snapshot created for a new query

### What changes were proposed in this pull request?
Fix error: Sst file size mismatch ... MANIFEST-000005 may be corrupted.

This is an edge case in SST file reuse that can only happen for the first ever RocksDB checkpoint if the following conditions happen:

1. The first ever RocksDB checkpoint (e.g. for version 10) was created with x.sst, but not yet upload by maintenance
2. The next batch using RocksDB at v10 fails and rolls back store to -1 (invalidates RocksDB)
3. A new request to load RocksDB at v10 comes in, but v10 checkpoint is still not uploaded hence we have to start replaying changelog starting from checkpoint v0.
4. We create a new v11 and new checkpoint with new x*.sst. v10 is now uploaded by maintenance. Then during upload of x*.sst for v11, we reuse x.sst DFS file, thinking it is the same as x*.sst.

The problem here is from step 3, the way the file manager loads v0 is different from how it loads other versions. During the load of other versions, when we delete an existing local file we also delete it from file mapping. But for v0, file manager just deletes the local dir and we missed clearing the file mapping in this case. Hence the old x.sst was still showing in the file mapping at step 4. We need to fix this and also add additional size check.

### Why are the changes needed?
Can cause checkpoint corruption, hence the query will fail.

### Does this PR introduce _any_ user-facing change?
No

### How was this patch tested?
New test included

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50512 from micheal-o/file_reuse_bug_for_new_query.

Authored-by: micheal-o <micheal.okutubo@gmail.com>
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com>
(cherry picked from commit 3f16577c21998c2940aa2f13c21834290aa6ea29)
Signed-off-by: Jungtaek Lim <kabhwan.opensource@gmail.com> (by micheal-o on 2025-04-09T03:59:21Z)
- 0fc7f01: [SPARK-51732][SQL] Apply `rpad` on attributes with same `ExprId` if they need to be deduplicated

### What changes were proposed in this pull request?
This PR fixes a case where `rpad` is not applied on attributes that have the same `ExprId` even though those attributes should be deduplicated.

### Why are the changes needed?
For example, consider the following query:

```
CREATE OR REPLACE TABLE t(a CHAR(50));
SELECT t1.aFROM t t1
WHERE (SELECT count(*) AS item_cnt FROM t t2 WHERE (t1.a = t2.a)) > 0
```
In the above case, `ApplyCharTypePadding` will run for subquery where `t1.a` and `t2.a` will reference the same `ExprId`, therefore we won't apply `rpad`. However, after `DeduplicateRelations` runs for outer query, `t1.a` and `t2.a` will get different `ExprIds` and would therefore need `rpad`. However, this doesn't happen because `ApplyCharTypePadding` for outer query does not recurse into the subquery.

On the other hand, for a query:

```
SELECT t1.a
FROM t t1, t t2
WHERE t1.a = t2.a
```
`ApplyCharTypePadding` will correctly add `rpad` to both `t1.a` and `t2.a` because attributes will first be deduplicated.

In particular, this fixes a code-path when `readSideCharPadding` is off and `LEGACY_NO_CHAR_PADDING_IN_PREDICATE` is also false

### Does this PR introduce _any_ user-facing change?

### How was this patch tested?

### Was this patch authored or co-authored using generative AI tooling?
No

Closes #50527 from mihailotim-db/mihailotim-db/apply_char_type_padding_subqueries.

Authored-by: Mihailo Timotic <mihailo.timotic@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 0246a7cbac10718c34f42c91f9628cf8ce6d0964)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Mihailo Timotic on 2025-04-09T05:32:47Z)
- e5036f1: [SPARK-51512][CORE] Filter out null MapStatus when cleaning up shuffle data with ExternalShuffleService

### What changes were proposed in this pull request?

When the application crashes unexpectedly, the registered map statuses may contain null values, therefore we should skip these null values when cleaning up shuffle data with ExternalShuffleService.

### Why are the changes needed?

Small bug fix

```log
25/03/14 15:41:35 ERROR ContextCleaner: Error cleaning shuffle 4
org.apache.spark.SparkException: Exception thrown in awaitResult:
	at org.apache.spark.util.SparkThreadUtils$.awaitResult(SparkThreadUtils.scala:53)
	at org.apache.spark.util.ThreadUtils$.awaitResult(ThreadUtils.scala:342)
	at org.apache.spark.rpc.RpcTimeout.awaitResult(RpcTimeout.scala:75)
	at org.apache.spark.rpc.RpcEndpointRef.askSync(RpcEndpointRef.scala:101)
	at org.apache.spark.rpc.RpcEndpointRef.askSync(RpcEndpointRef.scala:85)
	at org.apache.spark.storage.BlockManagerMaster.removeShuffle(BlockManagerMaster.scala:204)
	at org.apache.spark.shuffle.sort.io.LocalDiskShuffleDriverComponents.removeShuffle(LocalDiskShuffleDriverComponents.java:47)
	at org.apache.spark.ContextCleaner.doCleanupShuffle(ContextCleaner.scala:241)
	at org.apache.spark.ContextCleaner.$anonfun$keepCleaning$3(ContextCleaner.scala:203)
	at org.apache.spark.ContextCleaner.$anonfun$keepCleaning$3$adapted(ContextCleaner.scala:196)
	at scala.Option.foreach(Option.scala:437)
	at org.apache.spark.ContextCleaner.$anonfun$keepCleaning$1(ContextCleaner.scala:196)
	at org.apache.spark.util.Utils$.tryOrStopSparkContext(Utils.scala:1383)
	at org.apache.spark.ContextCleaner.org$apache$spark$ContextCleaner$$keepCleaning(ContextCleaner.scala:190)
	at org.apache.spark.ContextCleaner$$anon$1.run(ContextCleaner.scala:80)
Caused by: java.lang.NullPointerException: Cannot invoke "org.apache.spark.scheduler.MapStatus.location()" because "mapStatus" is null
	at org.apache.spark.storage.BlockManagerMasterEndpoint.$anonfun$removeShuffle$3(BlockManagerMasterEndpoint.scala:423)
	at scala.collection.ArrayOps$.foreach$extension(ArrayOps.scala:1323)
	at org.apache.spark.storage.BlockManagerMasterEndpoint.$anonfun$removeShuffle$2(BlockManagerMasterEndpoint.scala:421)
	at org.apache.spark.storage.BlockManagerMasterEndpoint.$anonfun$removeShuffle$2$adapted(BlockManagerMasterEndpoint.scala:420)
	at org.apache.spark.ShuffleStatus.$anonfun$withMapStatuses$1(MapOutputTracker.scala:435)
	at org.apache.spark.ShuffleStatus.withReadLock(MapOutputTracker.scala:72)
	at org.apache.spark.ShuffleStatus.withMapStatuses(MapOutputTracker.scala:435)
	at org.apache.spark.storage.BlockManagerMasterEndpoint.$anonfun$removeShuffle$1(BlockManagerMasterEndpoint.scala:420)
	at org.apache.spark.storage.BlockManagerMasterEndpoint.$anonfun$removeShuffle$1$adapted(BlockManagerMasterEndpoint.scala:419)
	at scala.Option.foreach(Option.scala:437)
	at org.apache.spark.storage.BlockManagerMasterEndpoint.org$apache$spark$storage$BlockManagerMasterEndpoint$$removeShuffle(BlockManagerMasterEndpoint.scala:419)
	at org.apache.spark.storage.BlockManagerMasterEndpoint$$anonfun$receiveAndReply$1.applyOrElse(BlockManagerMasterEndpoint.scala:201)
	at org.apache.spark.rpc.netty.Inbox.$anonfun$process$1(Inbox.scala:104)
	at org.apache.spark.rpc.netty.Inbox.safelyCall(Inbox.scala:216)
	at org.apache.spark.rpc.netty.Inbox.process(Inbox.scala:101)
	at org.apache.spark.rpc.netty.MessageLoop.org$apache$spark$rpc$netty$MessageLoop$$receiveLoop(MessageLoop.scala:76)
	at org.apache.spark.rpc.netty.MessageLoop$$anon$1.run(MessageLoop.scala:42)
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1144)
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:642)
	at java.base/java.lang.Thread.run(Thread.java:1583)
```

### Does this PR introduce _any_ user-facing change?

No

### How was this patch tested?

Local test

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50277 from wankunde/SPARK-51512.

Authored-by: Kun Wan <wankunde@163.com>
Signed-off-by: Kent Yao <yao@apache.org>
(cherry picked from commit f4ce0ab8cee043d0b1a8d935fb13ce617d2de873)
Signed-off-by: Kent Yao <yao@apache.org> (by Kun Wan on 2025-04-09T06:42:13Z)
- fddfe54: [SPARK-51395][SQL] Refine handling of default values in procedures

### What changes were proposed in this pull request?

This PR refines handling of default values in procedures that will be released in 4.0.

### Why are the changes needed?

These changes are needed as connectors like Iceberg may not have utilities to generate SQL strings containing Spark SQL dialects. The API should be changed to allow either a DSv2 expression or a SQL string.

### Does this PR introduce _any_ user-facing change?

Yes, but the stored procedure API hasn't been released yet.

### How was this patch tested?

This PR comes with tests.

### Was this patch authored or co-authored using generative AI tooling?

No.

(cherry picked from commit 738a50364f16c579e370736df92bf01fe0a06af1)

Closes #50541 from aokolnychyi/spark-51395-4.0.

Lead-authored-by: Anton Okolnychyi <aokolnychyi@apache.org>
Co-authored-by: Wenchen Fan <cloud0fan@gmail.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Anton Okolnychyi on 2025-04-09T15:10:07Z)
- 9858de8: [SPARK-51738][SQL] IN subquery with struct type

### What changes were proposed in this pull request?

This PR is to fix a long-standing issue that IN subquery allows the struct type field to have different names while binary comparison requires the left and right side struct-type values to have the same field name.

For example, `SELECT foo IN (SELECT struct(1 a)) FROM (SELECT struct(1 b) foo)` is a valid IN subquery even though the field names are different: `a` and `b`. However, Spark will rewrite IN subquery with join and compare the struct values as the join condition. This rewrite makes the plan become unresolved because comparison operator does not allow different field names.

This PR fixes it by relaxing the requirement for binary comparison. The field name and nullability doesn't matter when we compare two struct values.

### Why are the changes needed?

Fix potential issues. The plan validation is only enabled in tests so this unresolved plan may not cause actual issues.

### Does this PR introduce _any_ user-facing change?

Yes, some queries that fail to analyze before (compare structs) can now work.

### How was this patch tested?

new test

### Was this patch authored or co-authored using generative AI tooling?

no

Closes #50537 from cloud-fan/subquery.

Authored-by: Wenchen Fan <wenchen@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit 66926429450a35a3a543871c43639d3e5db5f5fd)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Wenchen Fan on 2025-04-09T15:11:48Z)
- 4078be6: [SPARK-51673][SQL] Apply default collation to alter view query

### What changes were proposed in this pull request?
Fixed the application of default collation in `ALTER VIEW` queries. For example, if a view has a default collation and we execute `ALTER VIEW v AS SELECT 'a' AS c1`, the default collation was not being applied to the literal `a`.

### Why are the changes needed?
Bug fix.

### Does this PR introduce _any_ user-facing change?
No.

### How was this patch tested?
Tests added to `DefaultCollationTestSuite.scala`

### Was this patch authored or co-authored using generative AI tooling?
No.

Closes #50468 from ilicmarkodb/fix_alter_view.

Authored-by: ilicmarkodb <marko.ilic@databricks.com>
Signed-off-by: Max Gekk <max.gekk@gmail.com>
(cherry picked from commit 99b7d2a7441bf1fb5aeb84b6f5094431494e4b9e)
Signed-off-by: Max Gekk <max.gekk@gmail.com> (by ilicmarkodb on 2025-04-09T19:37:41Z)
- f80f632: [SPARK-51738][SQL][FOLLOWUP] Fix HashJoin to accept structurally-equal types

### What changes were proposed in this pull request?

This is a follow-up of #50537.

Fixes `HashJoin` to accept structurally-equal types.

### Why are the changes needed?

#50537 relaxed the requirement for binary comparison, so should `HashJoin`; otherwise, it can fail with `IllegalArgumentException`.

For example, in `SubquerySuite`:

```scala
sql("""
      |SELECT foo IN (SELECT struct(c, d) FROM r)
      |FROM (SELECT struct(a, b) foo FROM l)
      |""".stripMargin).show()
```

fails with:

```
[info]   java.lang.IllegalArgumentException: requirement failed: Join keys from two sides should have same length and types
[info]   at scala.Predef$.require(Predef.scala:337)
[info]   at org.apache.spark.sql.execution.joins.HashJoin.org$apache$spark$sql$execution$joins$HashJoin$$x$6(HashJoin.scala:115)
[info]   at org.apache.spark.sql.execution.joins.HashJoin.org$apache$spark$sql$execution$joins$HashJoin$$x$6$(HashJoin.scala:110)
[info]   at org.apache.spark.sql.execution.joins.BroadcastHashJoinExec.org$apache$spark$sql$execution$joins$HashJoin$$x$6$lzycompute(BroadcastHashJoinExec.scala:40)
[info]   at org.apache.spark.sql.execution.joins.BroadcastHashJoinExec.org$apache$spark$sql$execution$joins$HashJoin$$x$6(BroadcastHashJoinExec.scala:40)
[info]   at org.apache.spark.sql.execution.joins.HashJoin.buildKeys(HashJoin.scala:110)
[info]   at org.apache.spark.sql.execution.joins.HashJoin.buildKeys$(HashJoin.scala:110)
[info]   at org.apache.spark.sql.execution.joins.BroadcastHashJoinExec.buildKeys$lzycompute(BroadcastHashJoinExec.scala:40)
[info]   at org.apache.spark.sql.execution.joins.BroadcastHashJoinExec.buildKeys(BroadcastHashJoinExec.scala:40)
[info]   at org.apache.spark.sql.execution.joins.HashJoin.buildBoundKeys(HashJoin.scala:130)
[info]   at org.apache.spark.sql.execution.joins.HashJoin.buildBoundKeys$(HashJoin.scala:129)
[info]   at org.apache.spark.sql.execution.joins.BroadcastHashJoinExec.buildBoundKeys$lzycompute(BroadcastHashJoinExec.scala:40)
[info]   at org.apache.spark.sql.execution.joins.BroadcastHashJoinExec.buildBoundKeys(BroadcastHashJoinExec.scala:40)
[info]   at org.apache.spark.sql.execution.joins.BroadcastHashJoinExec.requiredChildDistribution(BroadcastHashJoinExec.scala:63)
...
```

### Does this PR introduce _any_ user-facing change?

Yes, `HashJoin` will work.

### How was this patch tested?

Added the related test.

### Was this patch authored or co-authored using generative AI tooling?

No.

Closes #50549 from ueshin/issues/SPARK-51738/hashjoin.

Authored-by: Takuya Ueshin <ueshin@databricks.com>
Signed-off-by: Wenchen Fan <wenchen@databricks.com>
(cherry picked from commit a9987a38d5fd5c97f9f58dae66ca3d68eec10020)
Signed-off-by: Wenchen Fan <wenchen@databricks.com> (by Takuya Ueshin on 2025-04-10T02:28:29Z)
- 8149b80: [SPARK-51747][SQL] Data source cached plan should respect options

### What changes were proposed in this pull request?

Data source cached plan should respect options, such as CSV delimiter. Before this, DataSourceStrategy caches the first plan and reuses it in the future, ignoring updated options. This change returns a **new plan** if options are changed.

### Why are the changes needed?

For example:

```
spark.sql("CREATE TABLE t(a string, b string) USING CSV".stripMargin)
spark.sql("INSERT INTO TABLE t VALUES ('a;b', 'c')")

spark.sql("SELECT * FROM t").show()
spark.sql("SELECT * FROM t WITH ('delimiter' = ';')")
```

Expected output:

 ```
+----+----+
|col1|col2|
+----+----+
| a;b|   c|
+----+----+

+----+----+
|col1|col2|
+----+----+
|   a| b,c|
+----+----+
 ```

Output before this PR:

 ```
+----+----+
|col1|col2|
+----+----+
| a;b|   c|
+----+----+

+----+----+
|col1|col2|
+----+----+
| a;b|   c|
+----+----+
```

The PR is needed to get the expected result.

### Does this PR introduce _any_ user-facing change?

Yes, corrects the caching behavior from DataSourceStrategy

### How was this patch tested?

Added test in DDLSuite.scala

### Was this patch authored or co-authored using generative AI tooling?

No

Closes #50538 from asl3/asl3/datasourcestrategycacheoptions.

Lead-authored-by: Amanda Liu <amanda.liu@databricks.com>
Co-authored-by: Gengliang Wang <gengliang@apache.org>
Signed-off-by: Gengliang Wang <gengliang@apache.org>
(cherry picked from commit d2a864f988c792e9c211d012f8aa8815d1142703)
Signed-off-by: Gengliang Wang <gengliang@apache.org> (by Amanda Liu on 2025-04-10T03:10:42Z)
- e0a4d10: Removing test jars and class files (by Wenchen Fan on 2025-04-10T04:39:40Z)
- e0801d9: Preparing Spark release v4.0.0-rc4 (by Wenchen Fan on 2025-04-10T04:42:18Z)

# Files Changed

- .asf.yaml: modified (3 additions, 0 deletions)
- .github/PULL_REQUEST_TEMPLATE: modified (12 additions, 2 deletions)
- .github/labeler.yml: modified (191 additions, 117 deletions)
- .github/workflows/benchmark.yml: modified (54 additions, 52 deletions)
- .github/workflows/build_and_test.yml: modified (580 additions, 314 deletions)
- .github/workflows/build_ansi.yml: removed (0 additions, 48 deletions)
- .github/workflows/build_branch33.yml: removed (0 additions, 49 deletions)
- .github/workflows/build_branch34.yml: removed (0 additions, 49 deletions)
- .github/workflows/build_branch35.yml: added (53 additions, 0 deletions)
- .github/workflows/build_branch35_python.yml: added (47 additions, 0 deletions)
- .github/workflows/build_coverage.yml: modified (7 additions, 2 deletions)
- .github/workflows/build_infra_images_cache.yml: modified (158 additions, 5 deletions)
- .github/workflows/build_java11.yml: removed (0 additions, 49 deletions)
- .github/workflows/build_java17.yml: removed (0 additions, 49 deletions)
- .github/workflows/build_java21.yml: modified (12 additions, 4 deletions)
- .github/workflows/build_main.yml: modified (2 additions, 0 deletions)
- .github/workflows/build_maven.yml: added (33 additions, 0 deletions)
- .github/workflows/build_maven_java21.yml: added (35 additions, 0 deletions)
- .github/workflows/build_maven_java21_macos15.yml: added (44 additions, 0 deletions)
- .github/workflows/build_non_ansi.yml: added (53 additions, 0 deletions)
- .github/workflows/build_python_3.10.yml: added (47 additions, 0 deletions)
- .github/workflows/build_python_3.11_macos.yml: added (33 additions, 0 deletions)
- .github/workflows/build_python_3.12.yml: added (47 additions, 0 deletions)
- .github/workflows/build_python_3.13.yml: added (47 additions, 0 deletions)
- .github/workflows/build_python_3.9.yml: added (47 additions, 0 deletions)
- .github/workflows/build_python_connect.yml: added (138 additions, 0 deletions)
- .github/workflows/build_python_connect35.yml: added (116 additions, 0 deletions)
- .github/workflows/build_python_minimum.yml: added (46 additions, 0 deletions)
- .github/workflows/build_python_ps_minimum.yml: added (47 additions, 0 deletions)
- .github/workflows/build_python_pypy3.10.yml: added (47 additions, 0 deletions)
- .github/workflows/build_rockdb_as_ui_backend.yml: modified (6 additions, 4 deletions)
- .github/workflows/build_scala213.yml: removed (0 additions, 49 deletions)
- .github/workflows/build_sparkr_window.yml: added (93 additions, 0 deletions)
- .github/workflows/cancel_duplicate_workflow_runs.yml: removed (0 additions, 38 deletions)
- .github/workflows/labeler.yml: modified (1 additions, 14 deletions)
- .github/workflows/maven_test.yml: added (220 additions, 0 deletions)
- .github/workflows/notify_test_workflow.yml: modified (22 additions, 6 deletions)
- .github/workflows/pages.yml: added (98 additions, 0 deletions)
- .github/workflows/publish_snapshot.yml: modified (22 additions, 9 deletions)
- .github/workflows/python_macos_test.yml: added (163 additions, 0 deletions)
- .github/workflows/stale.yml: modified (1 additions, 0 deletions)
- .github/workflows/test_report.yml: modified (2 additions, 2 deletions)
- .github/workflows/update_build_status.yml: modified (3 additions, 3 deletions)
- .gitignore: modified (7 additions, 3 deletions)
- .nojekyll: added (0 additions, 0 deletions)
- LICENSE: modified (10 additions, 5 deletions)
- LICENSE-binary: modified (213 additions, 231 deletions)
- NOTICE-binary: modified (78 additions, 300 deletions)
- R/pkg/DESCRIPTION: modified (4 additions, 3 deletions)
- R/pkg/NAMESPACE: modified (2 additions, 0 deletions)
- R/pkg/R/DataFrame.R: modified (9 additions, 2 deletions)
- R/pkg/R/functions.R: modified (97 additions, 47 deletions)
- R/pkg/R/generics.R: modified (16 additions, 0 deletions)
- R/pkg/R/serialize.R: modified (1 additions, 1 deletions)
- R/pkg/R/sparkR.R: modified (1 additions, 1 deletions)
- R/pkg/R/zzz.R: added (30 additions, 0 deletions)
- R/pkg/README.md: modified (1 additions, 1 deletions)
- R/pkg/tests/fulltests/test_sparkR.R: modified (3 additions, 3 deletions)
- R/pkg/tests/fulltests/test_sparkSQL.R: modified (15 additions, 8 deletions)
- R/pkg/tests/fulltests/test_sparkSQL_arrow.R: modified (0 additions, 24 deletions)
- R/pkg/tests/fulltests/test_streaming.R: modified (2 additions, 3 deletions)
- R/pkg/vignettes/sparkr-vignettes.Rmd: modified (2 additions, 0 deletions)
- R/run-tests.sh: modified (2 additions, 2 deletions)
- README.md: modified (4 additions, 4 deletions)
- appveyor.yml: removed (0 additions, 75 deletions)
- assembly/README: modified (1 additions, 1 deletions)
- assembly/pom.xml: modified (134 additions, 34 deletions)
- bin/docker-image-tool.sh: modified (8 additions, 8 deletions)
- bin/load-spark-env.cmd: modified (15 additions, 15 deletions)
- bin/load-spark-env.sh: modified (22 additions, 22 deletions)
- bin/pyspark: modified (35 additions, 1 deletions)
- bin/pyspark2.cmd: modified (1 additions, 1 deletions)
- bin/spark-class2.cmd: modified (16 additions, 6 deletions)
- bin/spark-connect-shell: modified (1 additions, 2 deletions)
- bin/spark-shell: modified (4 additions, 1 deletions)
- bin/spark-sql: modified (1 additions, 0 deletions)
- bin/spark-sql2.cmd: modified (2 additions, 0 deletions)
- bin/sparkR: modified (1 additions, 0 deletions)
- bin/sparkR2.cmd: modified (2 additions, 0 deletions)
- binder/Dockerfile: added (43 additions, 0 deletions)
- binder/apt.txt: removed (0 additions, 2 deletions)
- binder/postBuild: modified (10 additions, 5 deletions)
- build/mvn: modified (6 additions, 26 deletions)
- build/spark-build-info.ps1: modified (2 additions, 1 deletions)
- common/kvstore/pom.xml: modified (18 additions, 8 deletions)
- common/kvstore/src/main/java/org/apache/spark/util/kvstore/ArrayWrappers.java: modified (14 additions, 14 deletions)
- common/kvstore/src/main/java/org/apache/spark/util/kvstore/KVStore.java: modified (2 additions, 2 deletions)
- common/kvstore/src/main/java/org/apache/spark/util/kvstore/KVStoreSerializer.java: modified (2 additions, 2 deletions)
- common/kvstore/src/main/java/org/apache/spark/util/kvstore/LevelDB.java: modified (11 additions, 5 deletions)
- common/kvstore/src/main/java/org/apache/spark/util/kvstore/LevelDBIterator.java: modified (70 additions, 13 deletions)
- common/kvstore/src/main/java/org/apache/spark/util/kvstore/LevelDBTypeInfo.java: modified (6 additions, 6 deletions)
- common/kvstore/src/main/java/org/apache/spark/util/kvstore/RocksDB.java: modified (10 additions, 5 deletions)
- common/kvstore/src/main/java/org/apache/spark/util/kvstore/RocksDBIterator.java: modified (60 additions, 14 deletions)
- common/kvstore/src/main/java/org/apache/spark/util/kvstore/RocksDBTypeInfo.java: modified (6 additions, 6 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/ArrayKeyIndexType.java: modified (1 additions, 2 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/ArrayWrappersSuite.java: modified (2 additions, 2 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/CustomType1.java: modified (1 additions, 2 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/CustomType2.java: modified (1 additions, 2 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/DBIteratorSuite.java: modified (14 additions, 12 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/InMemoryStoreSuite.java: modified (2 additions, 2 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/IntKeyType.java: modified (1 additions, 2 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/LevelDBBenchmark.java: modified (13 additions, 11 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/LevelDBIteratorSuite.java: modified (3 additions, 3 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/LevelDBSuite.java: modified (86 additions, 7 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/LevelDBTypeInfoSuite.java: modified (3 additions, 3 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/RocksDBBenchmark.java: modified (13 additions, 11 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/RocksDBIteratorSuite.java: modified (2 additions, 2 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/RocksDBSuite.java: modified (84 additions, 6 deletions)
- common/kvstore/src/test/java/org/apache/spark/util/kvstore/RocksDBTypeInfoSuite.java: modified (3 additions, 3 deletions)
- common/network-common/pom.xml: modified (46 additions, 11 deletions)
- common/network-common/src/main/java/org/apache/spark/network/TransportContext.java: modified (77 additions, 9 deletions)
- common/network-common/src/main/java/org/apache/spark/network/buffer/FileSegmentManagedBuffer.java: modified (7 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/buffer/ManagedBuffer.java: modified (14 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/buffer/NettyManagedBuffer.java: modified (5 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/buffer/NioManagedBuffer.java: modified (5 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/client/StreamInterceptor.java: modified (2 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/client/TransportClient.java: modified (18 additions, 9 deletions)
- common/network-common/src/main/java/org/apache/spark/network/client/TransportClientFactory.java: modified (49 additions, 13 deletions)
- common/network-common/src/main/java/org/apache/spark/network/client/TransportResponseHandler.java: modified (38 additions, 30 deletions)
- common/network-common/src/main/java/org/apache/spark/network/crypto/AuthClientBootstrap.java: modified (4 additions, 5 deletions)
- common/network-common/src/main/java/org/apache/spark/network/crypto/AuthEngine.java: modified (36 additions, 14 deletions)
- common/network-common/src/main/java/org/apache/spark/network/crypto/AuthMessage.java: modified (1 additions, 11 deletions)
- common/network-common/src/main/java/org/apache/spark/network/crypto/AuthRpcHandler.java: modified (13 additions, 10 deletions)
- common/network-common/src/main/java/org/apache/spark/network/crypto/CtrTransportCipher.java: added (381 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/crypto/GcmTransportCipher.java: added (410 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/crypto/README.md: modified (16 additions, 1 deletions)
- common/network-common/src/main/java/org/apache/spark/network/crypto/TransportCipher.java: modified (6 additions, 356 deletions)
- common/network-common/src/main/java/org/apache/spark/network/crypto/TransportCipherUtil.java: added (41 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/ChunkFetchFailure.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/ChunkFetchRequest.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/ChunkFetchSuccess.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/EncryptedMessageWithHeader.java: added (146 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/MergedBlockMetaRequest.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/Message.java: modified (17 additions, 17 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/MessageDecoder.java: modified (20 additions, 46 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/MessageEncoder.java: modified (10 additions, 7 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/MessageWithHeader.java: modified (6 additions, 5 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/OneWayMessage.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/RpcFailure.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/RpcRequest.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/RpcResponse.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/SslMessageEncoder.java: added (110 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/StreamChunkId.java: modified (2 additions, 10 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/StreamFailure.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/StreamRequest.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/StreamResponse.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/protocol/UploadStream.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/sasl/SaslClientBootstrap.java: modified (5 additions, 5 deletions)
- common/network-common/src/main/java/org/apache/spark/network/sasl/SaslRpcHandler.java: modified (3 additions, 3 deletions)
- common/network-common/src/main/java/org/apache/spark/network/sasl/SparkSaslClient.java: modified (10 additions, 13 deletions)
- common/network-common/src/main/java/org/apache/spark/network/sasl/SparkSaslServer.java: modified (10 additions, 14 deletions)
- common/network-common/src/main/java/org/apache/spark/network/server/BlockPushNonFatalFailure.java: modified (8 additions, 8 deletions)
- common/network-common/src/main/java/org/apache/spark/network/server/ChunkFetchRequestHandler.java: modified (21 additions, 13 deletions)
- common/network-common/src/main/java/org/apache/spark/network/server/OneForOneStreamManager.java: modified (4 additions, 3 deletions)
- common/network-common/src/main/java/org/apache/spark/network/server/RpcHandler.java: modified (3 additions, 4 deletions)
- common/network-common/src/main/java/org/apache/spark/network/server/TransportChannelHandler.java: modified (20 additions, 12 deletions)
- common/network-common/src/main/java/org/apache/spark/network/server/TransportRequestHandler.java: modified (35 additions, 26 deletions)
- common/network-common/src/main/java/org/apache/spark/network/server/TransportServer.java: modified (4 additions, 4 deletions)
- common/network-common/src/main/java/org/apache/spark/network/shuffledb/LevelDBIterator.java: modified (1 additions, 3 deletions)
- common/network-common/src/main/java/org/apache/spark/network/shuffledb/RocksDB.java: modified (3 additions, 4 deletions)
- common/network-common/src/main/java/org/apache/spark/network/shuffledb/RocksDBIterator.java: modified (1 additions, 2 deletions)
- common/network-common/src/main/java/org/apache/spark/network/shuffledb/StoreVersion.java: modified (5 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/ssl/ReloadingX509TrustManager.java: added (225 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/ssl/SSLFactory.java: added (484 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/util/ByteBufferWriteableChannel.java: added (59 additions, 0 deletions)
- common/network-common/src/main/java/org/apache/spark/network/util/DBProvider.java: modified (19 additions, 14 deletions)
- common/network-common/src/main/java/org/apache/spark/network/util/LevelDBProvider.java: modified (17 additions, 10 deletions)
- common/network-common/src/main/java/org/apache/spark/network/util/NettyLogger.java: modified (19 additions, 8 deletions)
- common/network-common/src/main/java/org/apache/spark/network/util/NettyUtils.java: modified (12 additions, 24 deletions)
- common/network-common/src/main/java/org/apache/spark/network/util/RocksDBProvider.java: modified (15 additions, 9 deletions)
- common/network-common/src/main/java/org/apache/spark/network/util/TransportConf.java: modified (199 additions, 2 deletions)
- common/network-common/src/test/java/org/apache/spark/network/ChunkFetchIntegrationSuite.java: modified (11 additions, 7 deletions)
- common/network-common/src/test/java/org/apache/spark/network/ChunkFetchRequestHandlerSuite.java: modified (15 additions, 15 deletions)
- common/network-common/src/test/java/org/apache/spark/network/ProtocolSuite.java: modified (2 additions, 2 deletions)
- common/network-common/src/test/java/org/apache/spark/network/RequestTimeoutIntegrationSuite.java: modified (4 additions, 4 deletions)
- common/network-common/src/test/java/org/apache/spark/network/RpcIntegrationSuite.java: modified (33 additions, 48 deletions)
- common/network-common/src/test/java/org/apache/spark/network/SslChunkFetchIntegrationSuite.java: added (32 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/StreamSuite.java: modified (19 additions, 20 deletions)
- common/network-common/src/test/java/org/apache/spark/network/StreamTestHelper.java: modified (10 additions, 17 deletions)
- common/network-common/src/test/java/org/apache/spark/network/TestManagedBuffer.java: modified (7 additions, 2 deletions)
- common/network-common/src/test/java/org/apache/spark/network/TransportConfSuite.java: added (88 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/TransportRequestHandlerSuite.java: modified (18 additions, 18 deletions)
- common/network-common/src/test/java/org/apache/spark/network/TransportResponseHandlerSuite.java: modified (2 additions, 2 deletions)
- common/network-common/src/test/java/org/apache/spark/network/client/SslTransportClientFactorySuite.java: added (39 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/client/TransportClientFactorySuite.java: modified (19 additions, 18 deletions)
- common/network-common/src/test/java/org/apache/spark/network/crypto/AuthEngineSuite.java: modified (57 additions, 138 deletions)
- common/network-common/src/test/java/org/apache/spark/network/crypto/AuthIntegrationSuite.java: modified (61 additions, 32 deletions)
- common/network-common/src/test/java/org/apache/spark/network/crypto/AuthMessagesSuite.java: modified (6 additions, 6 deletions)
- common/network-common/src/test/java/org/apache/spark/network/crypto/CtrAuthEngineSuite.java: added (177 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/crypto/GcmAuthEngineSuite.java: added (339 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/crypto/TransportCipherSuite.java: modified (6 additions, 6 deletions)
- common/network-common/src/test/java/org/apache/spark/network/protocol/EncodersSuite.java: modified (5 additions, 4 deletions)
- common/network-common/src/test/java/org/apache/spark/network/protocol/EncryptedMessageWithHeaderSuite.java: added (154 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/protocol/MergedBlockMetaSuccessSuite.java: modified (9 additions, 9 deletions)
- common/network-common/src/test/java/org/apache/spark/network/protocol/MessageWithHeaderSuite.java: modified (3 additions, 3 deletions)
- common/network-common/src/test/java/org/apache/spark/network/sasl/SparkSaslSuite.java: modified (4 additions, 7 deletions)
- common/network-common/src/test/java/org/apache/spark/network/server/OneForOneStreamManagerSuite.java: modified (16 additions, 15 deletions)
- common/network-common/src/test/java/org/apache/spark/network/ssl/ReloadingX509TrustManagerSuite.java: added (312 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/ssl/SSLFactorySuite.java: added (104 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/ssl/SslSampleConfigs.java: added (251 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/util/CryptoUtilsSuite.java: modified (2 additions, 2 deletions)
- common/network-common/src/test/java/org/apache/spark/network/util/DBProviderSuite.java: added (62 additions, 0 deletions)
- common/network-common/src/test/java/org/apache/spark/network/util/JavaUtilsSuite.java: modified (2 additions, 2 deletions)
- common/network-common/src/test/java/org/apache/spark/network/util/NettyMemoryMetricsSuite.java: modified (28 additions, 28 deletions)
- common/network-common/src/test/java/org/apache/spark/network/util/TimerWithCustomUnitSuite.java: modified (3 additions, 3 deletions)
- common/network-common/src/test/java/org/apache/spark/network/util/TransportFrameDecoderSuite.java: modified (7 additions, 5 deletions)
- common/network-common/src/test/resources/certchain.pem: added (17 additions, 0 deletions)
- common/network-common/src/test/resources/key.pem: added (29 additions, 0 deletions)
- common/network-common/src/test/resources/keystore: added (0 additions, 0 deletions)
- common/network-common/src/test/resources/truststore: added (0 additions, 0 deletions)
- common/network-common/src/test/resources/unencrypted-certchain.pem: added (21 additions, 0 deletions)
- common/network-common/src/test/resources/unencrypted-key.pem: added (28 additions, 0 deletions)
- common/network-common/src/test/resources/untrusted-keystore: added (0 additions, 0 deletions)
- common/network-shuffle/pom.xml: modified (13 additions, 3 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/sasl/ShuffleSecretManager.java: modified (10 additions, 5 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/BlockStoreClient.java: modified (9 additions, 7 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/DownloadFileWritableChannel.java: modified (2 additions, 1 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/ErrorHandler.java: modified (3 additions, 3 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/ExternalBlockHandler.java: modified (20 additions, 23 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/ExternalBlockStoreClient.java: modified (14 additions, 7 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/ExternalShuffleBlockResolver.java: modified (39 additions, 22 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/OneForOneBlockFetcher.java: modified (4 additions, 3 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/OneForOneBlockPusher.java: modified (4 additions, 3 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/RemoteBlockPushResolver.java: modified (150 additions, 79 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/RetryingBlockTransferor.java: modified (58 additions, 24 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/ShuffleIndexRecord.java: modified (1 additions, 17 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/ShuffleTransportContext.java: added (187 additions, 0 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/SimpleDownloadFile.java: modified (2 additions, 1 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/checksum/ShuffleChecksumHelper.java: modified (27 additions, 17 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/BlockPushReturnCode.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/BlockTransferMessage.java: modified (21 additions, 25 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/BlocksRemoved.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/ExecutorShuffleInfo.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/FinalizeShuffleMerge.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/GetLocalDirsForExecutors.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/LocalDirsForExecutors.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/MergeStatuses.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/OpenBlocks.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/PushBlockStream.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/RegisterExecutor.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/RemoveBlocks.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/RemoveShuffleMerge.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/StreamHandle.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/UploadBlock.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/UploadBlockStream.java: modified (1 additions, 2 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/mesos/RegisterDriver.java: removed (0 additions, 77 deletions)
- common/network-shuffle/src/main/java/org/apache/spark/network/shuffle/protocol/mesos/ShuffleServiceHeartbeat.java: removed (0 additions, 53 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/sasl/SaslIntegrationSuite.java: modified (12 additions, 12 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/sasl/ShuffleSecretManagerSuite.java: modified (2 additions, 2 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/AppIsolationSuite.java: modified (7 additions, 7 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/BlockTransferMessagesSuite.java: modified (2 additions, 2 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/CleanupNonShuffleServiceServedFilesSuite.java: modified (4 additions, 4 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/ErrorHandlerSuite.java: modified (2 additions, 2 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/ExternalBlockHandlerSuite.java: modified (29 additions, 25 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/ExternalShuffleBlockResolverSuite.java: modified (7 additions, 7 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/ExternalShuffleCleanupSuite.java: modified (5 additions, 5 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/ExternalShuffleIntegrationSuite.java: modified (130 additions, 96 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/ExternalShuffleSecuritySuite.java: modified (19 additions, 11 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/OneForOneBlockFetcherSuite.java: modified (2 additions, 2 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/OneForOneBlockPusherSuite.java: modified (2 additions, 2 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/RemoteBlockPushResolverSuite.java: modified (57 additions, 56 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/RetryingBlockTransferorSuite.java: modified (45 additions, 14 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/ShuffleIndexInformationSuite.java: modified (10 additions, 10 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/ShuffleTransportContextSuite.java: added (148 additions, 0 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/SimpleDownloadFileSuite.java: added (48 additions, 0 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/SslExternalShuffleIntegrationSuite.java: added (44 additions, 0 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/SslExternalShuffleSecuritySuite.java: added (45 additions, 0 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/SslShuffleTransportContextSuite.java: added (38 additions, 0 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/TestShuffleDataContext.java: modified (5 additions, 3 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/protocol/FetchShuffleBlockChunksSuite.java: modified (5 additions, 5 deletions)
- common/network-shuffle/src/test/java/org/apache/spark/network/shuffle/protocol/FetchShuffleBlocksSuite.java: modified (5 additions, 5 deletions)
- common/network-shuffle/src/test/resources/certchain.pem: added (17 additions, 0 deletions)
- common/network-shuffle/src/test/resources/key.pem: added (29 additions, 0 deletions)
- common/network-shuffle/src/test/resources/keystore: added (0 additions, 0 deletions)
- common/network-shuffle/src/test/resources/truststore: added (0 additions, 0 deletions)
- common/network-shuffle/src/test/resources/unencrypted-certchain.pem: added (21 additions, 0 deletions)
- common/network-shuffle/src/test/resources/unencrypted-key.pem: added (28 additions, 0 deletions)
- common/network-shuffle/src/test/resources/untrusted-keystore: added (0 additions, 0 deletions)
- common/network-yarn/pom.xml: modified (27 additions, 16 deletions)
- common/network-yarn/src/main/java/org/apache/spark/network/yarn/YarnShuffleService.java: modified (0 additions, 0 deletions)
- common/network-yarn/src/main/java/org/apache/spark/network/yarn/YarnShuffleServiceMetrics.java: modified (0 additions, 0 deletions)
- common/sketch/pom.xml: modified (0 additions, 0 deletions)
- common/sketch/src/main/java/org/apache/spark/util/sketch/BitArray.java: modified (0 additions, 0 deletions)
- common/sketch/src/main/java/org/apache/spark/util/sketch/BloomFilter.java: modified (0 additions, 0 deletions)
- common/sketch/src/main/java/org/apache/spark/util/sketch/BloomFilterImpl.java: modified (0 additions, 0 deletions)
- common/sketch/src/main/java/org/apache/spark/util/sketch/CountMinSketchImpl.java: modified (0 additions, 0 deletions)
- common/sketch/src/main/java/org/apache/spark/util/sketch/Utils.java: modified (0 additions, 0 deletions)
- common/sketch/src/test/scala/org/apache/spark/util/sketch/BloomFilterSuite.scala: modified (0 additions, 0 deletions)
- common/sketch/src/test/scala/org/apache/spark/util/sketch/CountMinSketchSuite.scala: modified (0 additions, 0 deletions)
- common/tags/pom.xml: modified (0 additions, 0 deletions)
- common/tags/src/main/java/org/apache/spark/annotation/ClassicOnly.java: added (0 additions, 0 deletions)
- common/tags/src/test/java/org/apache/spark/tags/AmmoniteTest.java: added (0 additions, 0 deletions)
- common/tags/src/test/java/org/apache/spark/tags/WebBrowserTest.java: added (0 additions, 0 deletions)
- common/unsafe/pom.xml: modified (0 additions, 0 deletions)
- common/unsafe/src/main/java/org/apache/spark/sql/catalyst/util/CollationAwareUTF8String.java: added (0 additions, 0 deletions)
- common/unsafe/src/main/java/org/apache/spark/sql/catalyst/util/CollationFactory.java: added (0 additions, 0 deletions)
- common/unsafe/src/main/java/org/apache/spark/sql/catalyst/util/CollationNames.java: added (0 additions, 0 deletions)
- common/unsafe/src/main/java/org/apache/spark/sql/catalyst/util/CollationSupport.java: added (0 additions, 0 deletions)
- common/unsafe/src/main/java/org/apache/spark/sql/catalyst/util/SpecialCodePointConstants.java: added (0 additions, 0 deletions)
- common/unsafe/src/main/java/org/apache/spark/unsafe/Platform.java: modified (0 additions, 0 deletions)
